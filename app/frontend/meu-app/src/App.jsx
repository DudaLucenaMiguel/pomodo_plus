import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPages"
import CadastroPages from "./pages/CadastroPages"
import TimerPage from "./pages/TimerPages"
import CiclosPages from "./pages/CiclosPages"
import AjustesPages from "./pages/AjustesPages"
import EditarPerfilPages from "./pages/EditarPerfilPages"
import HistoricoPages from "./pages/HistoricoPages"
import ProtectedRoute from "./routes/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPages />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/ciclos" element={<CiclosPages />} />
            <Route path="/ajustes" element={<AjustesPages />} />
            <Route path="/ajustes/editar-perfil" element={<EditarPerfilPages />} />
            <Route path="/historico" element={<HistoricoPages />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
