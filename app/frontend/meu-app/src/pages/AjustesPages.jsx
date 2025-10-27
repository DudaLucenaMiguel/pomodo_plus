import React from "react";
import { useNavigate } from "react-router-dom";
import "./AjustesPages.css";
import SideBar from "../components/SideBar";
import { useUsuario } from "../hooks/useUsuarios";

function AjustesPages() {
  const navigate = useNavigate();

  const raw = localStorage.getItem("usuario");
  const usuario = raw ? JSON.parse(raw) : null;
  const usuarioId = usuario?.id ?? null;

  const { data, loading, error } = useUsuario(usuarioId);

  const handleEditarPerfil = () => {
    if (!data) return;
    const state = {
      name: data.nome ?? data.name ?? "",
      email: data.email ?? "",
      avatar:
        data.avatar ??
        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png",
      banner:
        data.banner ??
        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png",
    };
    navigate("/ajustes/editar-perfil", { state });
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  };

  return (
    <div className="settings-page">
      <div className="settings-page__content">
        <div className="settings-page__header">
          <span className="settings-page__title">Ajustes</span>
        </div>

        <div className="settings-page__card">
          {loading ? (
            <div className="settings-page__skeleton">Carregando…</div>
          ) : error ? (
            <div className="settings-page__error">{String(error.message || error)}</div>
          ) : !data ? (
            <div className="settings-page__empty">Faça login para acessar as configurações.</div>
          ) : (
            <>
              <div className="settings-page__profile">
                <img
                  src={
                    data.avatar ||
                    "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png"
                  }
                  className="settings-page__avatar"
                  alt="Avatar"
                />
                <span className="settings-page__greeting">
                  Olá, {data.nome ?? data.name ?? "Usuário"}, bem-vindo(a) às configurações do Pomodoro+
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
            </>
          )}
        </div>

        <SideBar />
      </div>
    </div>
  );
}

export default AjustesPages;
