import React from "react";
import "./HistoricoPages.css";
import SideBar from "../components/SideBar";
import HistoricoCard from "../components/HistoricoCard";

function HistoricoPages() {
  return (
    <div className="contain">
      <div className="scroll-view">
        <div className="view">
          <span className="text">Histórico</span>
        </div>
        <div>
          <HistoricoCard />
        </div>
        {/* Navbar externa */}
        <SideBar />
      </div>
    </div>
  );
}

export default HistoricoPages;
