import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CiclosPages.css"
import SideBar from "../components/SideBar.jsx"
import CicloCard from "../components/CicloCard.jsx"

export default function CiclosPages() {
  const navigate = useNavigate()

  const [ciclos, setCiclos] = useState([
    { id: "c1", name: "Clássico 25-5", focusSec: 25 * 60, shortBreakSec: 5 * 60, longBreakSec: 15 * 60, cyclesBeforeLongBreak: 4 },
    { id: "c2", name: "Rápido 15-3",  focusSec: 15 * 60, shortBreakSec: 3 * 60, longBreakSec: 9 * 60,  cyclesBeforeLongBreak: 5 },
    { id: "c3", name: "Profundo 50-10", focusSec: 50 * 60, shortBreakSec: 10 * 60, longBreakSec: 20 * 60, cyclesBeforeLongBreak: 3 },
  ])

  const handleStart = (payload) => {
    navigate("/timer", { state: { ...payload, autoStartOnMount: true } })
  }

  const handleUpdate = (payload) => {
    setCiclos((prev) => prev.map((c) => (c.id === payload.id ? { ...c, ...payload } : c)))
  }

  const handleDelete = (id) => {
    setCiclos((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="cycles-page">
      <div className="cycles-page__content">
        <div className="cycles-page__header">
          <span className="cycles-page__title">Ciclos</span>
        </div>

        <div className="cycles-page__list">
          {ciclos.map((c) => (
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
