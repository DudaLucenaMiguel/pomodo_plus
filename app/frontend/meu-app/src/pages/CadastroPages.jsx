import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CadastroPages.css"

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())
}

function CadastroPages() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const isValid = useMemo(
    () =>
      String(name).trim().length >= 2 &&
      isEmail(email) &&
      String(password).length >= 6,
    [name, email, password]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid || submitting) return
    setSubmitting(true)
    setError("")
    try {
      const payload = { name: name.trim(), email: email.trim() }
      console.log("Cadastro simulado:", payload)
      setTimeout(() => {
        navigate("/login", { replace: true })
      }, 400)
    } catch (err) {
      setError("Não foi possível criar sua conta. Tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

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
              minLength={6}
              required
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
  )
}

export default CadastroPages
