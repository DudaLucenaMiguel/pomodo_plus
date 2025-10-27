import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import "./EditarPerfilPages.css";
import { UsuariosService } from "../services/api.service";

function EditarPerfilPages() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const raw = localStorage.getItem("usuario");
  const usuario = raw ? JSON.parse(raw) : null;
  const usuarioId = usuario?.id ?? null;

  const defaults = useMemo(
    () => ({
      name: "Usuário",
      email: "voce@exemplo.com",
      avatar:
        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png",
      banner:
        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png",
    }),
    []
  );

  const initial = {
    name: state?.name ?? usuario?.nome ?? usuario?.name ?? defaults.name,
    email: state?.email ?? usuario?.email ?? defaults.email,
    avatar: state?.avatar ?? defaults.avatar,
    banner: state?.banner ?? defaults.banner,
  };

  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!usuarioId) return;
    const payload = {
      nome: String(name || "").trim(),
      email: String(email || "").trim(),
    };
    setSaving(true);
    setError("");
    try {
      await UsuariosService.update(usuarioId, payload);
      const updated = { ...(usuario || {}), nome: payload.nome, email: payload.email };
      localStorage.setItem("usuario", JSON.stringify(updated));
      navigate(-1);
    } catch (err) {
      setError(err?.message || "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!usuarioId) return;
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
    );
    if (!confirmar) return;

    setDeleting(true);
    setError("");
    try {
      await UsuariosService.remove(usuarioId);
      localStorage.removeItem("usuario");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err?.message || "Não foi possível excluir a conta.");
    } finally {
      setDeleting(false);
    }
  };

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

          {error && <div className="profile-edit-page__error">{error}</div>}

          <button
            className="profile-edit-page__submit"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar informações"}
          </button>

          <button
            className="profile-edit-page__delete"
            onClick={handleDelete}
            disabled={deleting}
            style={{
              marginTop: "12px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              width: "100%",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {deleting ? "Excluindo conta..." : "Excluir conta"}
          </button>
        </div>

        <SideBar />
      </div>
    </div>
  );
}

export default EditarPerfilPages;
