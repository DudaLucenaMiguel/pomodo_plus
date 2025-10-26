import { useRef, useState } from "react"
import { useTimer } from "react-timer-hook"

export function usePomodoroTimer({
  focusSec = 25 * 60,
  shortBreakSec = 5 * 60,
  longBreakSec = 15 * 60,
  cyclesBeforeLongBreak = 4,
  autostartNext = true,
} = {}) {
  const [mode, setMode] = useState("idle")
  const [cycleCount, setCycleCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const lastFocusEndRef = useRef(null)
  const [timeBetweenSessionsMs, setTimeBetweenSessionsMs] = useState(null)
  const [sessionCount, setSessionCount] = useState(0)

  const nextExpiry = (sec) => {
    const d = new Date()
    d.setSeconds(d.getSeconds() + sec)
    return d
  }

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    autoStart: false,
    expiryTimestamp: nextExpiry(0),
    onExpire: () => {
      if (mode === "focus") {
        lastFocusEndRef.current = new Date()
        setCycleCount((c) => c + 1)
        const s = streak + 1
        setStreak(s)
        if (s >= cyclesBeforeLongBreak) {
          setStreak(0)
          setMode("long")
          restart(nextExpiry(longBreakSec), autostartNext)
        } else {
          setMode("short")
          restart(nextExpiry(shortBreakSec), autostartNext)
        }
      } else {
        setMode("focus")
        if (lastFocusEndRef.current) {
          setTimeBetweenSessionsMs(new Date() - lastFocusEndRef.current)
        }
        setSessionCount((x) => x + 1)
        restart(nextExpiry(focusSec), autostartNext)
      }
    },
  })

  const startFocus = () => {
    setMode("focus")
    restart(nextExpiry(focusSec), true)
    if (lastFocusEndRef.current) {
      setTimeBetweenSessionsMs(new Date() - lastFocusEndRef.current)
    }
    setSessionCount((x) => x + 1)
  }

  const startShort = () => {
    setMode("short")
    restart(nextExpiry(shortBreakSec), true)
  }

  const startLong = () => {
    setMode("long")
    restart(nextExpiry(longBreakSec), true)
  }

  const resetPhase = () => {
    const base = mode === "focus" ? focusSec : mode === "short" ? shortBreakSec : longBreakSec
    restart(nextExpiry(base), false)
  }

  const skip = () => {
    if (mode === "focus") {
      lastFocusEndRef.current = new Date()
      const s = streak + 1
      setStreak(s)
      if (s >= cyclesBeforeLongBreak) {
        setStreak(0)
        setMode("long")
        restart(nextExpiry(longBreakSec), autostartNext)
      } else {
        setMode("short")
        restart(nextExpiry(shortBreakSec), autostartNext)
      }
    } else {
      setMode("focus")
      if (lastFocusEndRef.current) {
        setTimeBetweenSessionsMs(new Date() - lastFocusEndRef.current)
      }
      setSessionCount((x) => x + 1)
      restart(nextExpiry(focusSec), autostartNext)
    }
  }

  const resetToIdle = () => {
    pause()
    setMode("idle")
    restart(nextExpiry(0), false)
  }

  const remainingSec = minutes * 60 + seconds

  return {
    mode,
    isRunning,
    remainingSec,
    cycleCount,
    streak,
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
  }
}
