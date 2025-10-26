import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import "./EditarPerfilPages.css"
import { useUsuario } from "../hooks/useUsuarios"
import { UsuariosService } from "../services/api.service"

function getCurrentUserId() {
  if (typeof window === "undefined") return 1
  const stored = window.localStorage.getItem("auth_user_id")
  const parsed = Number(stored)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function EditarPerfilPages() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const stateUsuario = state?.usuario || state || null
  const fallbackId = stateUsuario?.id ?? stateUsuario?.usuarioId ?? getCurrentUserId()
  const { data: usuario, loading, error } = useUsuario(fallbackId)

  const effectiveUser = useMemo(
    () => usuario ?? stateUsuario ?? null,
    [usuario, stateUsuario]
  )

  const [name, setName] = useState(effectiveUser?.nome ?? effectiveUser?.name ?? "")
  const [email, setEmail] = useState(effectiveUser?.email ?? "")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!effectiveUser) return
    setName(effectiveUser?.nome ?? effectiveUser?.name ?? "")
    setEmail(effectiveUser?.email ?? "")
  }, [effectiveUser])

  const handleSave = async () => {
    const payload = {
      nome: String(name || "").trim(),
      email: String(email || "").trim(),
    }

    if (!payload.nome || !payload.email) return

    try {
      setSaving(true)
      await UsuariosService.update(fallbackId, payload)
      navigate(-1)
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="profile-edit-page">
      <div className="profile-edit-page__content">
        <header className="profile-edit-page__header">
          <button
            type="button"
            className="profile-edit-page__back"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            title="Voltar"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="profile-edit-page__title">Editar Perfil</h1>
          <div className="profile-edit-page__spacer" />
        </header>
        <div className="profile-edit-page__card">
          <div className="profile-edit-page__fields">
            {loading && (
              <p className="profile-edit-page__message">Carregando dados...</p>
            )}
            {error && (
              <p className="profile-edit-page__message profile-edit-page__message--error">
                {error}
              </p>
            )}
            <div className="profile-edit-page__field">
              <span className="profile-edit-page__label">Nome</span>
              <div className="profile-edit-page__value">
                <input
                  className="profile-edit-page__input"
                  type="text"
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="profile-edit-page__field">
              <span className="profile-edit-page__label">E-mail</span>
              <div className="profile-edit-page__value">
                <input
                  className="profile-edit-page__input"
                  type="email"
                  maxLength={120}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                />
              </div>
            </div>
          </div>

          <button
            className="profile-edit-page__submit"
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? "Salvando..." : "Salvar informações"}
          </button>
        </div>

        <SideBar />
      </div>
    </div>
  )
}

export default EditarPerfilPages
