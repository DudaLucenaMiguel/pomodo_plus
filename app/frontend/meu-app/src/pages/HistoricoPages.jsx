import React from "react"
import "./HistoricoPages.css"
import SideBar from "../components/SideBar"
import HistoricoCard from "../components/HistoricoCard"

function HistoricoPages() {
  return (
    <div className="history-page">
      <div className="history-page__content">
        <div className="history-page__header">
          <span className="history-page__title">Histórico</span>
        </div>
        <HistoricoCard />
        <SideBar />
      </div>
    </div>
  )
}

export default HistoricoPages
