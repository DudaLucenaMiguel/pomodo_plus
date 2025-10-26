import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPages.css";
import { AuthService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const prefillEmail = useMemo(() => location.state?.prefillEmail ?? "", [location.state]);

  useEffect(() => {
    if (prefillEmail) {
      setEmail(prefillEmail);
    }
  }, [prefillEmail]);

  const isValid = useMemo(
    () => isEmail(email) && String(password).length >= 6,
    [email, password]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = { email: email.trim(), senha: password };
      const data = await AuthService.login(payload);
      const usuario = data?.usuario;
      if (!usuario?.id) {
        throw new Error("Resposta inesperada do servidor.");
      }

      login(
        {
          id: usuario.id,
          name: usuario.nome,
          email: usuario.email,
        },
        { remember }
      );

      const redirectTo = location.state?.from?.pathname || "/timer";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err?.message || err?.raw?.response?.data?.erro;
      setError(message || "Não foi possível entrar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__card">
        <header className="login-page__header">
          <div className="login-page__logo">Pomodoro+</div>
          <h1 className="login-page__title">Entrar</h1>
          <p className="login-page__subtitle">
            Acesse sua conta para continuar
          </p>
        </header>

        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <div className="login-page__field">
            <label className="login-page__label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="login-page__input"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-page__field">
            <label className="login-page__label" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="login-page__input"
              placeholder="mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              minLength={6}
            />
          </div>

          <div className="login-page__row">
            <label className="login-page__checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Lembrar-me</span>
            </label>
          </div>

          {error && <div className="login-page__error">{error}</div>}

          <button
            type="submit"
            className="login-page__submit"
            disabled={!isValid || submitting}
          >
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <footer className="login-page__footer">
          <span>Não tem conta?</span>
          <button
            type="button"
            className="login-page__link-btn"
            onClick={() => navigate("/cadastro")}
          >
            Criar conta
          </button>
        </footer>
      </div>
    </div>
  );
}
