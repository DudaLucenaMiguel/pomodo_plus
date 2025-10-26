import React, { useState, useMemo } from "react"
import { useLocation } from "react-router-dom"
import "./TimerPages.css"
import SideBar from "../components/SideBar.jsx"
import TimerComponent from "../components/TimerComponent.jsx"

export default function TimerPage() {
  const { state } = useLocation()
  const [mode, setMode] = useState("idle")

  const defaults = useMemo(
    () => ({
      focusSec: 25 * 60,
      shortBreakSec: 5 * 60,
      longBreakSec: 15 * 60,
      cyclesBeforeLongBreak: 4,
      autostartNext: true,
    }),
    []
  )

  const merged = {
    focusSec: state?.focusSec ?? defaults.focusSec,
    shortBreakSec: state?.shortBreakSec ?? defaults.shortBreakSec,
    longBreakSec: state?.longBreakSec ?? defaults.longBreakSec,
    cyclesBeforeLongBreak: state?.cyclesBeforeLongBreak ?? defaults.cyclesBeforeLongBreak,
    autostartNext: defaults.autostartNext,
    autoStartOnMount: !!state?.autoStartOnMount,
  }

  const backgroundColor = useMemo(() => {
    if (mode === "focus") return "#c62828"
    if (mode === "short") return "#1565c0"
    if (mode === "long") return "#f9a825"
    return "#222"
  }, [mode])

  return (
    <div className="timer-page" style={{ "--dynamic-bg": backgroundColor }}>
      <div className="timer-page__content">
        <div className="timer-page__header">
          <span className="timer-page__title">Cronômetro</span>
        </div>

        <TimerComponent
          focusSec={merged.focusSec}
          shortBreakSec={merged.shortBreakSec}
          longBreakSec={merged.longBreakSec}
          cyclesBeforeLongBreak={merged.cyclesBeforeLongBreak}
          autostartNext={merged.autostartNext}
          autoStartOnMount={merged.autoStartOnMount}
          onModeChange={setMode}
          onRegisterCycle={(p) => console.log("Registrar ciclo:", p)}
        />

        <SideBar />
      </div>
    </div>
  )
}
