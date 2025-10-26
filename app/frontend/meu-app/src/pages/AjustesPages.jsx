import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import "./AjustesPages.css"
import SideBar from "../components/SideBar"

function AjustesPages() {
  const navigate = useNavigate()

  const perfilSimulado = useMemo(
    () => ({
      name: "Fulano",
      email: "fulano@email.com",
      avatar: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png",
      banner: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png",
    }),
    []
  )

  const handleEditarPerfil = () => {
    navigate("/ajustes/editar-perfil", { state: perfilSimulado })
  }

  const handleSignOut = () => {
    localStorage.removeItem("auth_token")
    navigate("/login", { replace: true })
  }

  return (
    <div className="settings-page">
      <div className="settings-page__content">
        <div className="settings-page__header">
          <span className="settings-page__title">Ajustes</span>
        </div>
        <div className="settings-page__card">
          <div className="settings-page__profile">
            <img src={perfilSimulado.avatar} className="settings-page__avatar" alt="Avatar" />
            <span className="settings-page__greeting">
              Olá, {perfilSimulado.name}, seja bem-vindo(a) às configurações do Pomodoro+
            </span>
          </div>
          <div className="settings-page__actions">
            <button className="settings-page__action" onClick={handleEditarPerfil}>
              <span className="settings-page__action-label">Editar Perfil</span>
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/j9ft02jr_expires_30_days.png"
                className="settings-page__action-icon"
                alt="Editar perfil"
              />
            </button>
          </div>
          <button className="settings-page__signout" onClick={handleSignOut}>
            SAIR DA CONTA
          </button>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default AjustesPages
