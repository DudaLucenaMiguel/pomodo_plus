import React from "react"
import "./HistoricoCard.css"

function HistoricoCard() {
  return (
    <div className="history-card">
      <img
        src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/2qi72d81_expires_30_days.png"
        className="history-card__icon"
        alt="Ícone do histórico"
      />
      <div className="history-card__info">
        <span className="history-card__date">00/00/0000</span>
        <span className="history-card__title">Assunto - Tema</span>
        <div className="history-card__details">
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/y1qwqs4r_expires_30_days.png"
            className="history-card__details-icon"
            alt="Ícone de tempo"
          />
          <span className="history-card__time">00:00:00</span>
        </div>
      </div>
      <div className="history-card__status" />
    </div>
  )
}

export default HistoricoCard
