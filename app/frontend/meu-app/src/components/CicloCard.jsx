import React from 'react'
import "./CicloCard.css"

function CicloCard() {
  return (
       <div className="column">
          <div className="row-view">
            <span className="text2">Nome do Ciclo</span>
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/m0qbr0zv_expires_30_days.png"
              alt="ícone editar"
              className="image"
            />
          </div>
          <div className="column2">
              <div className="row-view2">
                <span className="text3">Tempo de Foco</span>
                <div className="view2">
                  <span className="text3">25 min</span>
                </div>
              </div>
              <div className="row-view2">
                <span className="text3">Tempo de Descanso</span>
                <div className="view2">
                  <span className="text3">5 min</span>
                </div>
              </div>
              <div className="row-view2">
                <span className="text3">Número de Ciclos</span>
                <div className="view2">
                  <span className="text3">4 ciclos</span>
                </div>
              </div>
              <div className="row-view2">
                <span className="text3">Descanso entre Sessões</span>
                <div className="view2">
                  <span className="text3">25 min</span>
                </div>
              </div>
          </div>
          <button className="button" onClick={() => alert("Pressed!")}>
            INICIAR SESSÃO
          </button>
        </div>
  )
}

export default CicloCard