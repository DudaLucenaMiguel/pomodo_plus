import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import "./EditarPerfilPages.css"
import { useCurrentUsuario } from "../hooks/useAuthUser"
import { useUsuario } from "../hooks/useUsuarios"
import { UsuariosService } from "../services/api.service"

function buildAvatar(nome, email) {
  const seed = nome || email || "Pomodoro"
  const encoded = encodeURIComponent(seed)
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encoded}`
}

function EditarPerfilPages() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { usuario: authUsuario } = useCurrentUsuario()
  const usuarioId = state?.usuarioId ?? authUsuario?.id ?? null
  const { data: usuarioData, loading, error } = useUsuario(usuarioId)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    if (usuarioData) {
      setName(usuarioData.nome ?? "")
      setEmail(usuarioData.email ?? "")
    }
  }, [usuarioData])

  const avatar = useMemo(() => buildAvatar(usuarioData?.nome, usuarioData?.email), [usuarioData])

  const trimmedName = useMemo(() => String(name || "").trim(), [name])
  const trimmedEmail = useMemo(() => String(email || "").trim(), [email])

  const dirty = useMemo(() => {
    if (!usuarioData) return false
    const originalName = usuarioData.nome ?? ""
    const originalEmail = usuarioData.email ?? ""
    return trimmedName !== originalName || trimmedEmail !== originalEmail
  }, [usuarioData, trimmedName, trimmedEmail])

  const handleSave = async () => {
    if (!usuarioId || submitting || !dirty) return

    const payload = {}
    if (trimmedName) payload.nome = trimmedName
    if (trimmedEmail) payload.email = trimmedEmail
    if (Object.keys(payload).length === 0) {
      navigate(-1)
      return
    }

    setSubmitting(true)
    setSubmitError("")
    try {
      await UsuariosService.update(usuarioId, payload)
      navigate(-1)
    } catch (err) {
      setSubmitError(err?.message || "Não foi possível salvar as alterações.")
    } finally {
      setSubmitting(false)
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
          {loading ? (
            <div className="profile-edit-page__feedback">Carregando dados do perfil...</div>
          ) : error ? (
            <div className="profile-edit-page__feedback profile-edit-page__feedback--error">{error}</div>
          ) : !usuarioData ? (
            <div className="profile-edit-page__feedback profile-edit-page__feedback--error">
              Não foi possível localizar o usuário autenticado.
            </div>
          ) : (
            <>
              <div className="profile-edit-page__avatar-preview">
                <img src={avatar} alt="Avatar" />
              </div>
              <div className="profile-edit-page__fields">
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

              {submitError && (
                <div className="profile-edit-page__feedback profile-edit-page__feedback--error">{submitError}</div>
              )}

              <button
                className="profile-edit-page__submit"
                onClick={handleSave}
                disabled={!dirty || submitting}
              >
                {submitting ? "Salvando..." : "Salvar informações"}
              </button>
            </>
          )}
        </div>

        <SideBar />
      </div>
    </div>
  )
}

export default EditarPerfilPages
