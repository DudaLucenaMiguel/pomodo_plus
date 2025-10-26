import React from "react"
import "./TimerPages.css"
import SideBar from "../components/SideBar.jsx"

function TimerPages() {
  return (
    <div className="timer-page">
      <div className="timer-page__content">
        <div className="timer-page__header">
          <span className="timer-page__title">Cronômetro</span>
        </div>

        <div className="timer-page__main">
          <div className="timer-page__focus-wrapper">
            <div className="timer-page__focus-chip">
              <span className="timer-page__focus-label">FOCO</span>
            </div>
          </div>

          <span className="timer-page__time">25:00</span>

          <div className="timer-page__cycles">
            <span className="timer-page__cycles-label">ciclos restantes:</span>
            <span className="timer-page__cycles-value">4/4</span>
          </div>

          <div className="timer-page__footer">
            <div className="timer-page__icon-column">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/kasngx8a_expires_30_days.png"
                className="timer-page__icon"
                alt="Descanso"
              />
              <span className="timer-page__icon-label">Descanso</span>
            </div>

            <div className="timer-page__timer-circle">{/* círculo do timer */}</div>

            <div className="timer-page__icon-column">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/xi4s14y3_expires_30_days.png"
                className="timer-page__icon"
                alt="Feito"
              />
              <span className="timer-page__icon-label">Feito</span>
            </div>
          </div>
        </div>

        <SideBar />
      </div>
    </div>
  )
}

export default TimerPages
