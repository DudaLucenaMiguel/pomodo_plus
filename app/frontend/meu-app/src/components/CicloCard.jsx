import React from "react"
import "./CicloCard.css"

function CicloCard() {
  return (
    <div className="ciclo-card">
      <div className="ciclo-card__header">
        <span className="ciclo-card__title">Nome do Ciclo</span>
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/m0qbr0zv_expires_30_days.png"
          alt="ícone editar"
          className="ciclo-card__edit-icon"
        />
      </div>

      <div className="ciclo-card__details">
        <div className="ciclo-card__detail-row">
          <span className="ciclo-card__label">Tempo de Foco</span>
          <div className="ciclo-card__value">
            <span className="ciclo-card__value-text">25 min</span>
          </div>
        </div>

        <div className="ciclo-card__detail-row">
          <span className="ciclo-card__label">Tempo de Descanso</span>
          <div className="ciclo-card__value">
            <span className="ciclo-card__value-text">5 min</span>
          </div>
        </div>

        <div className="ciclo-card__detail-row">
          <span className="ciclo-card__label">Número de Ciclos</span>
          <div className="ciclo-card__value">
            <span className="ciclo-card__value-text">4 ciclos</span>
          </div>
        </div>

        <div className="ciclo-card__detail-row">
          <span className="ciclo-card__label">Descanso entre Sessões</span>
          <div className="ciclo-card__value">
            <span className="ciclo-card__value-text">25 min</span>
          </div>
        </div>
      </div>

      <button className="ciclo-card__start-button" onClick={() => alert("Pressed!")}>
        INICIAR SESSÃO
      </button>
    </div>
  )
}

export default CicloCard
