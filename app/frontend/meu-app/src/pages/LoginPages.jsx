import React, { useMemo, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./LoginPages.css"

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const testUsers = [
    { email: "duda@exemplo.com", password: "123456" },
    { email: "teste@exemplo.com", password: "abcdef" },
    { email: "user@exemplo.com", password: "senha123" },
  ]

  const isValid = useMemo(() => isEmail(email) && String(password).length >= 6, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    setError("")
    try {
      const eClean = email.trim().toLowerCase()
      const ok = testUsers.some(u => u.email.toLowerCase() === eClean && u.password === password)
      if (!ok) {
        setError("Credenciais inválidas. Verifique e tente novamente.")
        return
      }
      const token = JSON.stringify({ email: eClean, ts: Date.now(), remember })
      localStorage.setItem("auth_token", token)
      const redirectTo = location.state?.from?.pathname || "/timer"
      navigate(redirectTo, { replace: true })
    } catch {
      setError("Não foi possível entrar. Tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-page__card">
        <header className="login-page__header">
          <div className="login-page__logo">Pomodoro+</div>
          <h1 className="login-page__title">Entrar</h1>
          <p className="login-page__subtitle">Acesse sua conta para continuar</p>
        </header>

        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <div className="login-page__field">
            <label className="login-page__label" htmlFor="email">E-mail</label>
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
            <label className="login-page__label" htmlFor="password">Senha</label>
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

            <button
              type="button"
              className="login-page__link-btn"
              onClick={() => console.log("Fluxo esqueci minha senha")}
            >
              Esqueci minha senha
            </button>
          </div>

          {error && <div className="login-page__error">{error}</div>}

          <button type="submit" className="login-page__submit" disabled={!isValid || submitting}>
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <footer className="login-page__footer">
          <span>Não tem conta?</span>
          <button type="button" className="login-page__link-btn" onClick={() => navigate("/cadastro")}>
            Criar conta
          </button>
        </footer>
      </div>
    </div>
  )
}
