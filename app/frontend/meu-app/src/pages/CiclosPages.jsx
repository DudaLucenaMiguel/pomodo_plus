import React from "react";
import "./CiclosPages.css";
import SideBar from "../components/SideBar.jsx";
import CicloCard from "../components/CicloCard.jsx";

function CiclosPages() {
  return (
    <div className="contain">
      <div className="scroll-view">
        <div className="view">
          <span className="text">Ciclos</span>
        </div>
        <CicloCard />
      </div>

      {/* Navbar importada do componente SideBar */}
      <SideBar />
    </div>
  );
}

export default CiclosPages;
