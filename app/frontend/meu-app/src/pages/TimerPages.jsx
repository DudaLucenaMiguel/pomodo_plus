import React from "react";
import "./TimerPages.css";
import SideBar from "../components/SideBar.jsx";

function TimerPages() {
  return (
    <div className="contain">
      <div className="scroll-view">
        <div className="view">
          <span className="text">Cronômetro</span>
        </div>

        <div className="column">
          <div className="view2">
            <div className="view3">
              <span className="text2">FOCO</span>
            </div>
          </div>

          <span className="text3">25:00</span>

          <div className="row-view">
            <span className="text4">ciclos restantes:</span>
            <span className="text5">4/4</span>
          </div>

          <div className="row-view2">
            <div className="column2">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/kasngx8a_expires_30_days.png"
                className="image"
                alt="Descanso"
              />
              <span className="text6">Descanso</span>
            </div>

            <div className="box">{/* círculo do timer */}</div>

            <div className="column2">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/xi4s14y3_expires_30_days.png"
                className="image"
                alt="Feito"
              />
              <span className="text6">Feito</span>
            </div>
          </div>
        </div>

        <SideBar />
      </div>
    </div>
  );
}

export default TimerPages;
