import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import TimerPages from "./pages/TimerPages.jsx";
import CiclosPages from "./pages/CiclosPages.jsx";
import HistoricoPages from "./pages/HistoricoPages.jsx";
import AjustesPages from "./pages/AjustesPages.jsx";
import EditarPerfilPages from "./pages/EditarPerfilPages.jsx";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        background: "#000",
        textAlign: "center",
      }}
    >
      <div>
        <h1>404</h1>
        <p>Página não encontrada</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona / para o cronômetro */}
        <Route path="/" element={<Navigate to="/timer" replace />} />

        {/* Rotas principais */}
        <Route path="/timer" element={<TimerPages />} />
        <Route path="/ciclos" element={<CiclosPages />} />
        <Route path="/historico" element={<HistoricoPages />} />
        <Route path="/ajustes" element={<AjustesPages />} />
        <Route path="/ajustes/editar-perfil" element={<EditarPerfilPages />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
