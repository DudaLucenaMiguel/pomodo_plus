import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CiclosPages.css"
import SideBar from "../components/SideBar.jsx"
import CicloCard from "../components/CicloCard.jsx"
import { useCiclos } from "../hooks/useCiclos"
import { CiclosService } from "../services/api.service"

function mapCycle(raw) {
  if (!raw) return null

  const id = raw.id
  const name = raw.nome ?? raw.titulo ?? raw.name ?? (id ? `Ciclo #${id}` : "Ciclo")

  return {
    id,
    name,
    focusSec: Number(raw.focusSec ?? raw.tempo_estudo ?? 0),
    shortBreakSec: Number(raw.shortBreakSec ?? raw.tempo_descanso ?? 0),
    longBreakSec: Number(raw.longBreakSec ?? raw.tempo_entre_ciclos ?? 0),
    cyclesBeforeLongBreak: Number(
      raw.cyclesBeforeLongBreak ?? raw.repeticoes ?? 1,
    ),
  }
}

export default function CiclosPages() {
  const navigate = useNavigate()
  const { data, loading, error } = useCiclos()

  const [ciclos, setCiclos] = useState([])

  useEffect(() => {
    if (!Array.isArray(data)) return
    setCiclos(data.map(mapCycle).filter(Boolean))
  }, [data])

  const hasItems = ciclos.length > 0

  const primaryMessage = useMemo(() => {
    if (loading) return { text: "Carregando ciclos...", tone: "info" }
    if (!loading && error && !hasItems)
      return { text: String(error), tone: "error" }
    if (!loading && !error && !hasItems)
      return { text: "Nenhum ciclo cadastrado até o momento.", tone: "info" }
    return null
  }, [loading, error, hasItems])

  const secondaryError = !loading && error && hasItems ? String(error) : null

  const handleStart = (payload) => {
    if (payload?.id) {
      navigate("/timer", {
        state: { cicloId: payload.id, autoStartOnMount: true },
      })
      return
    }

    navigate("/timer", { state: { ...payload, autoStartOnMount: true } })
  }

  const handleUpdate = async (payload) => {
    const { id } = payload
    if (!id) return

    try {
      await CiclosService.update(id, {
        tempo_estudo: String(payload.focusSec),
        tempo_descanso: String(payload.shortBreakSec),
        tempo_entre_ciclos: String(payload.longBreakSec),
        repeticoes: String(payload.cyclesBeforeLongBreak),
      })
      setCiclos((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...payload } : c))
      )
    } catch (err) {
      console.error("Erro ao atualizar ciclo:", err)
    }
  }

  const handleDelete = async (id) => {
    if (!id) return

    try {
      await CiclosService.remove(id)
      setCiclos((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error("Erro ao excluir ciclo:", err)
    }
  }

  return (
    <div className="cycles-page">
      <div className="cycles-page__content">
        <div className="cycles-page__header">
          <span className="cycles-page__title">Ciclos</span>
        </div>

        <div className="cycles-page__list">
          {primaryMessage && (
            <p
              className={`cycles-page__message${
                primaryMessage.tone === "error" ? " cycles-page__message--error" : ""
              }`}
            >
              {primaryMessage.text}
            </p>
          )}

          {secondaryError && (
            <p className="cycles-page__message cycles-page__message--error">
              {secondaryError}
            </p>
          )}

          {hasItems &&
            ciclos.map((c) => (
              <CicloCard
                key={c.id}
                id={c.id}
                name={c.name}
                focusSec={c.focusSec}
                shortBreakSec={c.shortBreakSec}
                longBreakSec={c.longBreakSec}
                cyclesBeforeLongBreak={c.cyclesBeforeLongBreak}
                onStart={handleStart}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
        </div>

        <SideBar />
      </div>
    </div>
  )
}
