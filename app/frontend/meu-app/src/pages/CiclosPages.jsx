import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CiclosPages.css"
import SideBar from "../components/SideBar.jsx"
import CicloCard from "../components/CicloCard.jsx"
import { useCurrentUsuario } from "../hooks/useAuthUser"
import { useCiclos } from "../hooks/useCiclos"
import { CiclosService } from "../services/api.service"

function adaptCycle(apiCiclo) {
  if (!apiCiclo) return null
  const focusMin = Number(apiCiclo.tempo_estudo ?? 0) || 0
  const shortMin = Number(apiCiclo.tempo_descanso ?? 0) || 0
  const longMin = Number(apiCiclo.tempo_entre_ciclos ?? 0) || 0
  const cycles = Number(apiCiclo.repeticoes ?? 1) || 1
  const fallbackName = apiCiclo.id ? `Ciclo ${apiCiclo.id}` : "Ciclo personalizado"
  const name = (apiCiclo.nome && String(apiCiclo.nome).trim()) || fallbackName

  return {
    id: apiCiclo.id,
    usuarioId: apiCiclo.usuario_id,
    name,
    focusSec: Math.max(1, focusMin) * 60,
    shortBreakSec: Math.max(0, shortMin) * 60,
    longBreakSec: Math.max(0, longMin) * 60,
    cyclesBeforeLongBreak: Math.max(1, cycles),
  }
}

export default function CiclosPages() {
  const navigate = useNavigate()
  const { usuario } = useCurrentUsuario()
  const usuarioId = usuario?.id ?? null
  const { data, loading, error } = useCiclos({ usuarioId })

  const [ciclos, setCiclos] = useState([])
  const [actionError, setActionError] = useState("")
  const [processingId, setProcessingId] = useState(null)

  const adaptedList = useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.map(adaptCycle).filter(Boolean)
  }, [data])

  useEffect(() => {
    setCiclos(adaptedList)
  }, [adaptedList])

  const handleStart = (payload) => {
    navigate("/timer", { state: { ...payload, autoStartOnMount: true } })
  }

  const handleUpdate = async (payload) => {
    const current = ciclos.find((c) => c.id === payload.id)
    if (!current) return

    const targetUsuarioId = current.usuarioId ?? usuarioId
    const body = {
      usuario_id: targetUsuarioId,
      tempo_estudo: Math.round(payload.focusSec / 60),
      tempo_descanso: Math.round(payload.shortBreakSec / 60),
      tempo_entre_ciclos: Math.round(payload.longBreakSec / 60),
      repeticoes: Math.max(1, Number(payload.cyclesBeforeLongBreak)),
    }

    try {
      setProcessingId(payload.id)
      setActionError("")
      await CiclosService.update(payload.id, body)
      setCiclos((prev) =>
        prev.map((c) =>
          c.id === payload.id
            ? {
                ...c,
                ...payload,
                usuarioId: targetUsuarioId,
              }
            : c
        )
      )
    } catch (err) {
      setActionError(err?.message || "Não foi possível atualizar o ciclo.")
    } finally {
      setProcessingId(null)
    }
  }

  const handleDelete = async (id) => {
    try {
      setProcessingId(id)
      setActionError("")
      await CiclosService.remove(id)
      setCiclos((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      setActionError(err?.message || "Não foi possível remover o ciclo.")
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <div className="cycles-page">
      <div className="cycles-page__content">
        <div className="cycles-page__header">
          <span className="cycles-page__title">Ciclos</span>
        </div>

        <div className="cycles-page__list">
          {loading ? (
            <div className="cycles-page__feedback">Carregando ciclos...</div>
          ) : error ? (
            <div className="cycles-page__feedback cycles-page__feedback--error">{error}</div>
          ) : ciclos.length === 0 ? (
            <div className="cycles-page__feedback">Nenhum ciclo cadastrado para exibir.</div>
          ) : (
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
                disabled={processingId === c.id}
              />
            ))
          )}
        </div>

        {actionError && <div className="cycles-page__feedback cycles-page__feedback--error">{actionError}</div>}

        <SideBar />
      </div>
    </div>
  )
}
