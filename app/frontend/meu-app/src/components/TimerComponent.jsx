import React, { useEffect, useMemo } from "react"
import "./TimerComponent.css"
import { usePomodoroTimer } from "../hooks/usePomodoroTimer"

function pad(n) {
  return String(n).padStart(2, "0")
}

export default function TimerComponent({
  focusSec = 25 * 60,
  shortBreakSec = 5 * 60,
  longBreakSec = 15 * 60,
  cyclesBeforeLongBreak = 4,
  autostartNext = true,
  onModeChange,
}) {
  const {
    mode,
    isRunning,
    remainingSec,
    streak,
    startFocus,
    startShort,
    startLong,
    pause,
    resume,
    resetPhase,
    skip,
  } = usePomodoroTimer({
    focusSec,
    shortBreakSec,
    longBreakSec,
    cyclesBeforeLongBreak,
    autostartNext,
  })

  useEffect(() => {
    if (typeof onModeChange === "function") onModeChange(mode)
  }, [mode, onModeChange])

  const m = Math.floor(remainingSec / 60)
  const s = remainingSec % 60
  const chip = useMemo(
    () => (mode === "focus" ? "FOCO" : mode === "idle" ? "PRONTO" : "DESCANSO"),
    [mode]
  )
  const restantes = useMemo(() => `${Math.max(0, cyclesBeforeLongBreak - streak)}/${cyclesBeforeLongBreak}`, [streak, cyclesBeforeLongBreak])
  const skipIcon = mode === "focus" ? "coffee" : "book_5"

  const handlePrimary = () => {
    if (isRunning) return pause()
    if (mode === "idle") return startFocus()
    if (mode === "focus") return remainingSec === focusSec ? startFocus() : resume()
    if (mode === "short") return remainingSec === shortBreakSec ? startShort() : resume()
    if (mode === "long") return remainingSec === longBreakSec ? startLong() : resume()
  }

  return (
    <div className="timer">
      <div className="timer__focus-wrapper">
        <div className="timer__focus-chip">
          <span className="timer__focus-label">{chip}</span>
        </div>
      </div>

      <span className="timer__time">
        {pad(m)}:{pad(s)}
      </span>

      <div className="timer__cycles">
        <span className="timer__cycles-label">ciclos restantes:</span>
        <span className="timer__cycles-value">{restantes}</span>
      </div>

      <div className="timer__footer">
        <button className="timer__button" type="button" onClick={resetPhase}>
          <span className="material-symbols-outlined">replay</span>
        </button>

        <button className="timer__button" type="button" onClick={handlePrimary}>
          <span className="material-symbols-outlined">
            {isRunning ? "pause" : "play_arrow"}
          </span>
        </button>

        <button className="timer__button" type="button" onClick={skip}>
          <span className="material-symbols-outlined">{skipIcon}</span>
        </button>
      </div>
    </div>
  )
}
