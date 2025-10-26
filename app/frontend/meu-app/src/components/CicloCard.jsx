import React, { useMemo, useState } from "react"
import "./CicloCard.css"

function mm(sec) {
  return Math.round(sec / 60)
}

export default function CicloCard({
  id,
  name,
  focusSec,
  shortBreakSec,
  longBreakSec,
  cyclesBeforeLongBreak,
  onStart,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false)
  const [formName, setFormName] = useState(name)
  const [formFocus, setFormFocus] = useState(mm(focusSec))
  const [formShort, setFormShort] = useState(mm(shortBreakSec))
  const [formLong, setFormLong] = useState(mm(longBreakSec))
  const [formCycles, setFormCycles] = useState(cyclesBeforeLongBreak)

  const handleStart = () => {
    if (typeof onStart === "function") {
      onStart({ id, name, focusSec, shortBreakSec, longBreakSec, cyclesBeforeLongBreak })
    }
  }

  const handleEdit = () => {
    setEditing(true)
    setFormName(name)
    setFormFocus(mm(focusSec))
    setFormShort(mm(shortBreakSec))
    setFormLong(mm(longBreakSec))
    setFormCycles(cyclesBeforeLongBreak)
  }

  const handleSaveSingle = () => {
    const newName = String(formName || "").trim()
    const payload = {
      id,
      name: newName || name,
      focusSec: Math.max(1, Number(formFocus)) * 60,
      shortBreakSec: Math.max(0, Number(formShort)) * 60,
      longBreakSec: Math.max(0, Number(formLong)) * 60,
      cyclesBeforeLongBreak: Math.max(1, Number(formCycles)),
    }
    const changed =
      (newName || name) !== name ||
      payload.focusSec !== focusSec ||
      payload.shortBreakSec !== shortBreakSec ||
      payload.longBreakSec !== longBreakSec ||
      payload.cyclesBeforeLongBreak !== cyclesBeforeLongBreak

    if (changed) {
      if (typeof onUpdate === "function") onUpdate(payload)
    }
    setEditing(false)
  }

  const handleDelete = () => {
    if (typeof onDelete === "function") onDelete(id)
  }

  const details = useMemo(
    () => [
      { label: "Tempo de Foco", value: `${mm(focusSec)} min`, type: "focus" },
      { label: "Tempo de Descanso", value: `${mm(shortBreakSec)} min`, type: "short" },
      { label: "Número de Ciclos", value: `${cyclesBeforeLongBreak} ciclos`, type: "cycles" },
      { label: "Descanso entre Sessões", value: `${mm(longBreakSec)} min`, type: "long" },
    ],
    [focusSec, shortBreakSec, longBreakSec, cyclesBeforeLongBreak]
  )

  return (
    <div className="ciclo-card">
      <div className="ciclo-card__header">
        {editing ? (
          <input
            className="ciclo-card__title-input"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            maxLength={60}
          />
        ) : (
          <span className="ciclo-card__title">{name}</span>
        )}

        <div className="ciclo-card__icons">
          {!editing && (
            <button className="ciclo-card__icon-btn" aria-label="Editar" onClick={handleEdit}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          )}
          <button className="ciclo-card__icon-btn ciclo-card__icon-btn--danger" aria-label="Deletar" onClick={handleDelete}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <div className="ciclo-card__details">
        {!editing ? (
          <>
            {details.map((d) => (
              <div key={d.type} className="ciclo-card__detail-row">
                <span className="ciclo-card__label">{d.label}</span>
                <div className="ciclo-card__value">
                  <span className="ciclo-card__value-text">{d.value}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Tempo de Foco</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="1"
                  step="1"
                  value={formFocus}
                  onChange={(e) => setFormFocus(e.target.value)}
                />
                <span className="ciclo-card__suffix">min</span>
              </div>
            </div>

            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Tempo de Descanso</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="0"
                  step="1"
                  value={formShort}
                  onChange={(e) => setFormShort(e.target.value)}
                />
                <span className="ciclo-card__suffix">min</span>
              </div>
            </div>

            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Número de Ciclos</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="1"
                  step="1"
                  value={formCycles}
                  onChange={(e) => setFormCycles(e.target.value)}
                />
                <span className="ciclo-card__suffix">ciclos</span>
              </div>
            </div>

            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Descanso entre Sessões</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="0"
                  step="1"
                  value={formLong}
                  onChange={(e) => setFormLong(e.target.value)}
                />
                <span className="ciclo-card__suffix">min</span>
              </div>
            </div>
          </>
        )}
      </div>

      {!editing ? (
        <button className="ciclo-card__start-button" onClick={handleStart}>
          INICIAR SESSÃO
        </button>
      ) : (
        <button className="ciclo-card__start-button ciclo-card__start-button--confirm" onClick={handleSaveSingle}>
          SALVAR
        </button>
      )}
    </div>
  )
}
