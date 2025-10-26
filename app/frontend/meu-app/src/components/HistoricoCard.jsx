import React from "react"
import "./HistoricoCard.css"

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR")
  } catch {
    return "—"
  }
}

function pad(n) {
  return String(n).padStart(2, "0")
}

function fmtDuration(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function HistoricoCard({
  id,
  dateISO,
  title,
  durationSec,
  status = "completed",
  onDelete,
  onOpen,
  disabled = false,
}) {
  const isDisabled = Boolean(disabled)
  const handleDelete = () => {
    if (isDisabled) return
    if (typeof onDelete === "function") onDelete(id)
  }
  const handleOpen = () => {
    if (isDisabled) return
    if (typeof onOpen === "function") onOpen(id)
  }
  const statusClass =
    status === "completed" ? "history-card__status--ok" : "history-card__status--aborted"

  return (
    <div className={`history-card${isDisabled ? " history-card--disabled" : ""}`}>
      <div
        className="history-card__left"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-disabled={isDisabled}
      >
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/2qi72d81_expires_30_days.png"
          className="history-card__icon"
          alt="Histórico"
        />
        <div className="history-card__info">
          <span className="history-card__date">{fmtDate(dateISO)}</span>
          <span className="history-card__title">{title}</span>
          <div className="history-card__details">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/y1qwqs4r_expires_30_days.png"
              className="history-card__details-icon"
              alt="Tempo"
            />
            <span className="history-card__time">{fmtDuration(durationSec)}</span>
          </div>
        </div>
      </div>

      <div className={`history-card__status ${statusClass}`} />

      <button
        className="history-card__delete-btn"
        type="button"
        aria-label="Deletar"
        onClick={handleDelete}
        title="Deletar sessão"
        disabled={isDisabled}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  )
}
