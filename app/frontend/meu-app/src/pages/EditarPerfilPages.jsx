import React from "react";
import SideBar from "../components/SideBar";
import "./EditarPerfilPages.css";

function EditarPerfilPages() {
  return (
    <div className="contain">
      <div className="scroll-view">
        <img
          src={
            "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png"
          }
          className="image"
        />
        <div className="column">
          <div className="column2">
            <div className="column3">
              <span className="text">{"Nome:"}</span>
              <div className="view">
                <span className="text2">{"Fulano"}</span>
              </div>
            </div>
            <div className="column3">
              <span className="text">{"e-mail:"}</span>
              <div className="view">
                <span className="text2">{"fulano@email.com"}</span>
              </div>
            </div>
          </div>
          <button className="button" onClick={() => alert("Pressed!")}>
            <span className="text2">{"Salvar informações"}</span>
          </button>
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default EditarPerfilPages;
