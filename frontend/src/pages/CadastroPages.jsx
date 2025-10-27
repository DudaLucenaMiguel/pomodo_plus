import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroPages.css";
import { AuthService } from "../services/api.service";

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

export default function CadastroPages() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid = useMemo(
    () =>
      name.trim().length >= 2 && isEmail(email) && password.trim().length >= 6,
    [name, email, password]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = { nome: name.trim(), email: email.trim(), senha: password };
      const data = await AuthService.register(payload);
      if (!data?.id && !data?.usuario?.id)
        throw new Error("Erro ao cadastrar usuário.");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err?.message || "Não foi possível criar sua conta.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page__card">
        <header className="signup-page__header">
          <div className="signup-page__logo">Pomodoro+</div>
          <h1 className="signup-page__title">Criar conta</h1>
          <p className="signup-page__subtitle">Comece sua jornada de foco</p>
        </header>

        <form className="signup-page__form" onSubmit={handleSubmit} noValidate>
          <div className="signup-page__field">
            <label className="signup-page__label" htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              className="signup-page__input"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="signup-page__field">
            <label className="signup-page__label" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="signup-page__input"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-page__field">
            <label className="signup-page__label" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className="signup-page__input"
              placeholder="mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <div className="signup-page__error">{error}</div>}

          <button
            type="submit"
            className="signup-page__submit"
            disabled={!isValid || submitting}
          >
            {submitting ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <footer className="signup-page__footer">
          <span>Já tem conta?</span>
          <button
            type="button"
            className="signup-page__link-btn"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>
        </footer>
      </div>
    </div>
  );
}
