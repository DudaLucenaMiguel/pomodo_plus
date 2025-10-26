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

  const [elapsedFocusSec, setElapsedFocusSec] = useState(0)
  const [elapsedShortSec, setElapsedShortSec] = useState(0)
  const [elapsedLongSec, setElapsedLongSec] = useState(0)
  const [elapsedTotalSec, setElapsedTotalSec] = useState(0)
  const phaseStartRef = useRef(null)

  const nextExpiry = (sec) => {
    const d = new Date()
    d.setSeconds(d.getSeconds() + sec)
    return d
  }

  const accrue = () => {
    if (!phaseStartRef.current) return
    const now = Date.now()
    const delta = Math.max(0, Math.floor((now - phaseStartRef.current) / 1000))
    if (delta > 0) {
      if (mode === "focus") setElapsedFocusSec((v) => v + delta)
      else if (mode === "short") setElapsedShortSec((v) => v + delta)
      else if (mode === "long") setElapsedLongSec((v) => v + delta)
      setElapsedTotalSec((v) => v + delta)
      phaseStartRef.current = now
    }
  }

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    autoStart: false,
    expiryTimestamp: nextExpiry(0),
    onExpire: () => {
      accrue()
      if (mode === "focus") {
        lastFocusEndRef.current = new Date()
        setCycleCount((c) => c + 1)
        const s = streak + 1
        setStreak(s)
        if (s >= cyclesBeforeLongBreak) {
          setStreak(0)
          setMode("long")
          phaseStartRef.current = Date.now()
          restart(nextExpiry(longBreakSec), autostartNext)
        } else {
          setMode("short")
          phaseStartRef.current = Date.now()
          restart(nextExpiry(shortBreakSec), autostartNext)
        }
      } else {
        setMode("focus")
        if (lastFocusEndRef.current) {
          setTimeBetweenSessionsMs(new Date() - lastFocusEndRef.current)
        }
        setSessionCount((x) => x + 1)
        phaseStartRef.current = Date.now()
        restart(nextExpiry(focusSec), autostartNext)
      }
    },
  })

  const startFocus = () => {
    setMode("focus")
    phaseStartRef.current = Date.now()
    restart(nextExpiry(focusSec), true)
    if (lastFocusEndRef.current) {
      setTimeBetweenSessionsMs(new Date() - lastFocusEndRef.current)
    }
    setSessionCount((x) => x + 1)
  }

  const startShort = () => {
    setMode("short")
    phaseStartRef.current = Date.now()
    restart(nextExpiry(shortBreakSec), true)
  }

  const startLong = () => {
    setMode("long")
    phaseStartRef.current = Date.now()
    restart(nextExpiry(longBreakSec), true)
  }

  const doPause = () => {
    accrue()
    pause()
  }

  const doResume = () => {
    phaseStartRef.current = Date.now()
    resume()
  }

  const resetPhase = () => {
    accrue()
    const base = mode === "focus" ? focusSec : mode === "short" ? shortBreakSec : longBreakSec
    restart(nextExpiry(base), false)
    phaseStartRef.current = null
  }

  const skip = () => {
    accrue()
    if (mode === "focus") {
      lastFocusEndRef.current = new Date()
      const s = streak + 1
      setStreak(s)
      if (s >= cyclesBeforeLongBreak) {
        setStreak(0)
        setMode("long")
        phaseStartRef.current = Date.now()
        restart(nextExpiry(longBreakSec), autostartNext)
      } else {
        setMode("short")
        phaseStartRef.current = Date.now()
        restart(nextExpiry(shortBreakSec), autostartNext)
      }
    } else {
      setMode("focus")
      if (lastFocusEndRef.current) {
        setTimeBetweenSessionsMs(new Date() - lastFocusEndRef.current)
      }
      setSessionCount((x) => x + 1)
      phaseStartRef.current = Date.now()
      restart(nextExpiry(focusSec), autostartNext)
    }
  }

  const resetAccumulators = () => {
    setElapsedFocusSec(0)
    setElapsedShortSec(0)
    setElapsedLongSec(0)
    setElapsedTotalSec(0)
  }

  const resetToIdle = () => {
    accrue()
    pause()
    setMode("idle")
    restart(nextExpiry(0), false)
    phaseStartRef.current = null
    resetAccumulators()
    setStreak(0)
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
    elapsedFocusSec,
    elapsedShortSec,
    elapsedLongSec,
    elapsedTotalSec,
    startFocus,
    startShort,
    startLong,
    pause: doPause,
    resume: doResume,
    resetPhase,
    skip,
    resetToIdle,
  }
}
