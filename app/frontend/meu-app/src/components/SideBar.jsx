import React from "react";
import "./SideBar.css";

function SideBar() {
  const items = [
    {
      label: "Histórico",
      src: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/yao6rera_expires_30_days.png",
      active: false,
    },
    {
      label: "Cronômetro",
      src: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/tfec9zbw_expires_30_days.png",
      active: true,
      onClick: () => alert("Pressed!"),
    },
    {
      label: "Ciclos",
      src: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/vbsjvt2m_expires_30_days.png",
      active: false,
    },
    {
      label: "Ajustes",
      src: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/hr2o6e9i_expires_30_days.png",
      active: false,
    },
  ];

  return (
    <div className="row-view3">
      {items.map(({ label, src, active, onClick }, index) =>
        active ? (
          <button key={index} className="button-column" onClick={onClick}>
            <img src={src} alt={label} className="image2" />
            <span className="text8">{label}</span>
          </button>
        ) : (
          <div key={index} className="icon-group">
            <img src={src} alt={label} className="image2" />
            <span className="text7">{label}</span>
          </div>
        )
      )}
    </div>
  );
}

export default SideBar;
