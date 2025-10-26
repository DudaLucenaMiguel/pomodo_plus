import React from "react"
import "./CiclosPages.css"
import SideBar from "../components/SideBar.jsx"
import CicloCard from "../components/CicloCard.jsx"

function CiclosPages() {
  return (
    <div className="cycles-page">
      <div className="cycles-page__content">
        <div className="cycles-page__header">
          <span className="cycles-page__title">Ciclos</span>
        </div>
        <CicloCard />
        <SideBar />
      </div>
    </div>
  )
}

export default CiclosPages
