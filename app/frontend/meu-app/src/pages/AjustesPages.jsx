import React from "react"
import { useNavigate } from "react-router-dom"
import "./AjustesPages.css"
import SideBar from "../components/SideBar"
import { useCurrentUsuario } from "../hooks/useAuthUser"

function buildAvatar(nome, email) {
  const seed = nome || email || "Pomodoro"
  const encoded = encodeURIComponent(seed)
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encoded}`
}

function AjustesPages() {
  const navigate = useNavigate()
  const { usuario, loading, error } = useCurrentUsuario()

  const nome = usuario?.nome ?? "Usuário"
  const email = usuario?.email ?? ""
  const avatar = buildAvatar(nome, email)
  const banner = "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png"

  const handleEditarPerfil = () => {
    if (!usuario) return
    navigate("/ajustes/editar-perfil", { state: { usuarioId: usuario.id } })
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
          {loading ? (
            <div className="settings-page__loading">Carregando informações do usuário...</div>
          ) : error ? (
            <div className="settings-page__error">{error}</div>
          ) : (
            <>
              <div className="settings-page__profile">
                <img src={avatar} className="settings-page__avatar" alt="Avatar" />
                <span className="settings-page__greeting">
                  Olá, {nome}, seja bem-vindo(a) às configurações do Pomodoro+
                </span>
              </div>
              <div className="settings-page__details">{email}</div>
              <div className="settings-page__banner">
                <img src={banner} alt="Banner" />
              </div>
              <div className="settings-page__actions">
                <button className="settings-page__action" onClick={handleEditarPerfil} disabled={!usuario}>
                  <span className="settings-page__action-label">Editar Perfil</span>
                  <img
                    src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/j9ft02jr_expires_30_days.png"
                    className="settings-page__action-icon"
                    alt="Editar perfil"
                  />
                </button>
              </div>
            </>
          )}
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
