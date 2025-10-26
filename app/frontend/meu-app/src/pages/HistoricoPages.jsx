import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./HistoricoPages.css"
import SideBar from "../components/SideBar"
import HistoricoCard from "../components/HistoricoCard"

export default function HistoricoPages() {
  const navigate = useNavigate()

  const [historico, setHistorico] = useState([
    {
      id: "h1",
      dateISO: "2025-10-20T08:40:00Z",
      title: "Estudos de Estruturas de Dados",
      durationSec: 25 * 60,
      status: "completed",
    },
    {
      id: "h2",
      dateISO: "2025-10-21T14:10:00Z",
      title: "Revisão de Cálculo",
      durationSec: 50 * 60,
      status: "completed",
    },
    {
      id: "h3",
      dateISO: "2025-10-22T19:30:00Z",
      title: "Projeto React — Pomodoro",
      durationSec: 15 * 60,
      status: "aborted",
    },
  ])

  const handleDelete = (id) => {
    setHistorico((prev) => prev.filter((s) => s.id !== id))
  }

  const handleOpen = (id) => {
    navigate("/timer", { state: { fromHistoryId: id } })
  }

  return (
    <div className="history-page">
      <div className="history-page__content">
        <div className="history-page__header">
          <span className="history-page__title">Histórico</span>
        </div>

        <div className="history-page__list">
          {historico.map((item) => (
            <HistoricoCard
              key={item.id}
              id={item.id}
              dateISO={item.dateISO}
              title={item.title}
              durationSec={item.durationSec}
              status={item.status}
              onDelete={handleDelete}
              onOpen={handleOpen}
            />
          ))}
        </div>

        <SideBar />
      </div>
    </div>
  )
}
