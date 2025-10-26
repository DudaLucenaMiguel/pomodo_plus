import React, { useState, useMemo } from "react"
import "./TimerPages.css"
import SideBar from "../components/SideBar.jsx"
import TimerComponent from "../components/TimerComponent.jsx"

export default function TimerPage() {
  const [mode, setMode] = useState("idle")

  const backgroundColor = useMemo(() => {
    if (mode === "focus") return "#c62828"
    if (mode === "short") return "#1565c0"
    if (mode === "long") return "#f9a825"
    return "#222"
  }, [mode])

  const config = {
    focusSec: 25 * 60,
    shortBreakSec: 5 * 60,
    longBreakSec: 15 * 60,
    cyclesBeforeLongBreak: 4,
    autostartNext: true,
  }

  return (
    <div className="timer-page" style={{ "--dynamic-bg": backgroundColor }}>
      <div className="timer-page__content">
        <div className="timer-page__header">
          <span className="timer-page__title">Cronômetro</span>
        </div>

        <TimerComponent
          {...config}
          onModeChange={setMode}
        />

        <SideBar />
      </div>
    </div>
  )
}
