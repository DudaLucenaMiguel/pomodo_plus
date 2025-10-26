import React from "react";
import "./HistoricoCard.css";

function HistoricoCard() {
  return (
    <div className="row-view">
      <img
        src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/2qi72d81_expires_30_days.png"
        className="image"
        alt="Ícone do histórico"
      />
      <div className="column">
        <span className="text2">00/00/0000</span>
        <span className="text3">Assunto - Tema</span>
        <div className="row-view2">
          <img
            src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/y1qwqs4r_expires_30_days.png"
            className="image2"
            alt="Ícone de tempo"
          />
          <span className="text4">00:00:00</span>
        </div>
      </div>
      <div className="box" />
    </div>
  );
}

export default HistoricoCard;
