import React from "react"
import "./AjustesPages.css"
import SideBar from "../components/SideBar"

function AjustesPages() {
  return (
    <div className="settings-page">
      <div className="settings-page__content">
        <div className="settings-page__header">
          <span className="settings-page__title">Ajustes</span>
        </div>
        <div className="settings-page__card">
          <div className="settings-page__profile">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png"
              className="settings-page__avatar"
              alt="Avatar"
            />
            <span className="settings-page__greeting">
              Olá, Fulano, seja bem-vindo(a) às configurações do Pomodoro+
            </span>
          </div>
          <div className="settings-page__actions">
            <div className="settings-page__action">
              <span className="settings-page__action-label">Editar Perfil</span>
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/j9ft02jr_expires_30_days.png"
                className="settings-page__action-icon"
                alt="Editar perfil"
              />
            </div>
            <div className="settings-page__action">
              <span className="settings-page__action-label">Assuntos e Temas</span>
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/ftu2i6mf_expires_30_days.png"
                className="settings-page__action-icon"
                alt="Assuntos e temas"
              />
            </div>
          </div>
          <button className="settings-page__signout" onClick={() => alert("Pressed!")}>
            SAIR DA CONTA
          </button>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default AjustesPages
