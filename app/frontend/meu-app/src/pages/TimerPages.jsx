import React, { useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import "./TimerPages.css"
import SideBar from "../components/SideBar.jsx"
import TimerComponent from "../components/TimerComponent.jsx"
import { useCiclo, useCiclos } from "../hooks/useCiclos"
import { SessoesService } from "../services/api.service"

function normalizeCycle(raw) {
  if (!raw) return null

  const id = raw.id ?? raw.cicloId ?? raw.ciclo_id
  const focusSec = Number(
    raw.focusSec ?? raw.tempo_estudo ?? raw.focus_sec ?? 25 * 60,
  )
  const shortBreakSec = Number(
    raw.shortBreakSec ?? raw.tempo_descanso ?? raw.short_break_sec ?? 5 * 60,
  )
  const longBreakSec = Number(
    raw.longBreakSec ?? raw.tempo_entre_ciclos ?? raw.long_break_sec ?? 15 * 60,
  )
  const cyclesBeforeLongBreak = Number(
    raw.cyclesBeforeLongBreak ?? raw.repeticoes ?? raw.cycles ?? 4,
  )

  return {
    id,
    name: raw.name ?? raw.nome ?? raw.titulo ?? (id ? `Ciclo #${id}` : "Ciclo"),
    focusSec,
    shortBreakSec,
    longBreakSec,
    cyclesBeforeLongBreak,
    autostartNext: raw.autostartNext ?? true,
  }
}

function getCurrentUserId() {
  if (typeof window === "undefined") return 1
  const stored = window.localStorage.getItem("auth_user_id")
  const parsed = Number(stored)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export default function TimerPage() {
  const { state } = useLocation()
  const [mode, setMode] = useState("idle")

  const cicloId = state?.cicloId ?? state?.id ?? null
  const userId = getCurrentUserId()

  const {
    data: cicloData,
    loading: loadingCiclo,
    error: cicloError,
  } = useCiclo(cicloId)
  const {
    data: ciclosData,
    loading: loadingCiclos,
    error: ciclosError,
  } = useCiclos()

  const selectedCycle = useMemo(() => {
    if (cicloData) return cicloData
    if (Array.isArray(ciclosData) && ciclosData.length > 0) return ciclosData[0]
    return null
  }, [cicloData, ciclosData])

  const normalizedFromState = useMemo(() => normalizeCycle(state), [state])
  const normalizedFromApi = useMemo(
    () => normalizeCycle(selectedCycle),
    [selectedCycle]
  )

  const defaults =
    normalizedFromState ??
    normalizedFromApi ??
    normalizeCycle({
      focusSec: 25 * 60,
      shortBreakSec: 5 * 60,
      longBreakSec: 15 * 60,
      cyclesBeforeLongBreak: 4,
      autostartNext: true,
    })

  const effectiveCycleId =
    normalizedFromApi?.id ?? normalizedFromState?.id ?? cicloId ?? null

  const loading = loadingCiclo || loadingCiclos
  const error = cicloError || ciclosError

  const merged = {
    focusSec: defaults.focusSec,
    shortBreakSec: defaults.shortBreakSec,
    longBreakSec: defaults.longBreakSec,
    cyclesBeforeLongBreak: defaults.cyclesBeforeLongBreak,
    autostartNext: defaults.autostartNext,
    autoStartOnMount: !!state?.autoStartOnMount,
  }

  const backgroundColor = useMemo(() => {
    if (mode === "focus") return "#c62828"
    if (mode === "short") return "#1565c0"
    if (mode === "long") return "#f9a825"
    return "#222"
  }, [mode])

  const handleRegisterCycle = async (payload) => {
    if (!effectiveCycleId || !userId) {
      console.log("Registrar ciclo:", payload)
      return
    }

    const startedAt = new Date(payload.timestamp ?? Date.now())
    const elapsedSec = Number(payload?.elapsed?.totalSec ?? 0)
    const finishedAt = new Date(startedAt.getTime() + elapsedSec * 1000)

    try {
      await SessoesService.create({
        usuario_id: String(userId),
        ciclo_id: String(effectiveCycleId),
        assunto_id: payload.assuntoId ? String(payload.assuntoId) : "",
        tema_id: payload.temaId ? String(payload.temaId) : "",
        inicio: startedAt.toISOString(),
        fim: finishedAt.toISOString(),
        status: "CONCLUIDA",
      })
    } catch (err) {
      console.error("Erro ao registrar sessão:", err)
    }
  }

  return (
    <div className="timer-page" style={{ "--dynamic-bg": backgroundColor }}>
      <div className="timer-page__content">
        <div className="timer-page__header">
          <span className="timer-page__title">Cronômetro</span>
        </div>

        {loading && (
          <p className="timer-page__status">Carregando ciclos...</p>
        )}
        {error && (
          <p className="timer-page__status timer-page__status--error">
            {error}
          </p>
        )}

        <TimerComponent
          focusSec={merged.focusSec}
          shortBreakSec={merged.shortBreakSec}
          longBreakSec={merged.longBreakSec}
          cyclesBeforeLongBreak={merged.cyclesBeforeLongBreak}
          autostartNext={merged.autostartNext}
          autoStartOnMount={merged.autoStartOnMount}
          onModeChange={setMode}
          onRegisterCycle={handleRegisterCycle}
        />

        <SideBar />
      </div>
    </div>
  )
}
