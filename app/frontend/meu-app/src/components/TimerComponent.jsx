import React, { useEffect, useMemo, useRef } from "react"
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
  autoStartOnMount = false,
  onModeChange,
  onRegisterCycle,
}) {
  const {
    mode,
    isRunning,
    remainingSec,
    streak,
    cycleCount,
    sessionCount,
    timeBetweenSessionsMs,
    startFocus,
    startShort,
    startLong,
    pause,
    resume,
    resetPhase,
    skip,
    resetToIdle,
  } = usePomodoroTimer({
    focusSec,
    shortBreakSec,
    longBreakSec,
    cyclesBeforeLongBreak,
    autostartNext,
  })

  const startedRef = useRef(false)

  useEffect(() => {
    if (typeof onModeChange === "function") onModeChange(mode)
  }, [mode, onModeChange])

  useEffect(() => {
    if (!startedRef.current && autoStartOnMount && mode === "idle") {
      startedRef.current = true
      startFocus()
    }
  }, [autoStartOnMount, mode, startFocus])

  const m = Math.floor(remainingSec / 60)
  const s = remainingSec % 60
  const chip = useMemo(
    () => (mode === "focus" ? "FOCO" : mode === "idle" ? "PRONTO" : "DESCANSO"),
    [mode]
  )
  const restantes = useMemo(
    () => `${Math.max(0, cyclesBeforeLongBreak - streak)}/${cyclesBeforeLongBreak}`,
    [streak, cyclesBeforeLongBreak]
  )
  const skipIcon = mode === "focus" ? "coffee" : "book_5"

  const handlePrimary = () => {
    if (isRunning) return pause()
    if (mode === "idle") return startFocus()
    if (mode === "focus") return remainingSec === focusSec ? startFocus() : resume()
    if (mode === "short") return remainingSec === shortBreakSec ? startShort() : resume()
    if (mode === "long") return remainingSec === longBreakSec ? startLong() : resume()
  }

  const handleEndCycle = () => {
    const payload = {
      timestamp: new Date().toISOString(),
      mode,
      focusSec,
      shortBreakSec,
      longBreakSec,
      cyclesBeforeLongBreak,
      cycleCount,
      sessionCount,
      timeBetweenSessionsMs,
      remainingSec,
    }
    if (typeof onRegisterCycle === "function") onRegisterCycle(payload)
    resetToIdle()
  }

  const showOnlyPlay = mode === "idle"

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
        {showOnlyPlay ? (
          <button className="timer__button" type="button" onClick={handlePrimary}>
            <span className="material-symbols-outlined">
              {isRunning ? "pause" : "play_arrow"}
            </span>
          </button>
        ) : (
          <>
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

            <button className="timer__button" type="button" onClick={handleEndCycle}>
              <span className="material-symbols-outlined">task_alt</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
