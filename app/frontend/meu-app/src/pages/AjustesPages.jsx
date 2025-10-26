import React from "react"
import { useNavigate } from "react-router-dom"
import "./AjustesPages.css"
import SideBar from "../components/SideBar"
import { useUsuario } from "../hooks/useUsuarios"

function getCurrentUserId() {
  if (typeof window === "undefined") return 1
  const stored = window.localStorage.getItem("auth_user_id")
  const parsed = Number(stored)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

function AjustesPages() {
  const navigate = useNavigate()
  const userId = getCurrentUserId()
  const { data: usuario, loading, error } = useUsuario(userId)

  const name = usuario?.nome ?? "Usuário"
  const email = usuario?.email ?? ""
  const avatar =
    usuario?.avatar ??
    "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png"

  const handleEditarPerfil = () => {
    navigate("/ajustes/editar-perfil", {
      state: {
        usuario: {
          id: usuario?.id ?? userId,
          nome: name,
          email,
          avatar,
        },
      },
    })
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
            <img src={avatar} className="settings-page__avatar" alt="Avatar" />
            <span className="settings-page__greeting">
              {loading
                ? "Carregando informações do perfil..."
                : error
                  ? "Não foi possível carregar seu perfil."
                  : `Olá, ${name}, seja bem-vindo(a) às configurações do Pomodoro+`}
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
