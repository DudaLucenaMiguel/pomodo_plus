import React, { useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import "./EditarPerfilPages.css"

function EditarPerfilPages() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const defaults = useMemo(
    () => ({
      name: "Fulano",
      email: "fulano@email.com",
      avatar: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png",
      banner: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png",
    }),
    []
  )

  const initial = {
    name: state?.name ?? defaults.name,
    email: state?.email ?? defaults.email,
    avatar: state?.avatar ?? defaults.avatar,
    banner: state?.banner ?? defaults.banner,
  }

  const [name, setName] = useState(initial.name)
  const [email, setEmail] = useState(initial.email)

  const handleSave = () => {
    const payload = {
      name: String(name || "").trim(),
      email: String(email || "").trim(),
    }
    console.log("Salvar perfil (simulado):", payload)
    navigate(-1)
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

          <button className="profile-edit-page__submit" onClick={handleSave}>
            Salvar informações
          </button>
        </div>

        <SideBar />
      </div>
    </div>
  )
}

export default EditarPerfilPages
