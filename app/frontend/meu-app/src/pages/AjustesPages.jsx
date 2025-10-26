import React from "react";
import "./AjustesPages.css";
import SideBar from "../components/SideBar";

function AjustesPages() {
  return (
    <div className="contain">
      <div className="scroll-view">
        <div className="view">
          <span className="text">{"Ajustes"}</span>
        </div>
        <div className="column">
          <div className="row-view">
            <img
              src={
                "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/qanzd6kx_expires_30_days.png"
              }
              className="image"
            />
            <span className="text2">
              {"Olá, Fulano, seja bem vindo(a) as configurações do Pomodoro+"}
            </span>
          </div>
          <div className="column2">
            <div className="row-view2">
              <span className="text3">{"Editar Perfil"}</span>
              <img
                src={
                  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/j9ft02jr_expires_30_days.png"
                }
                className="image2"
              />
            </div>
            <div className="row-view3">
              <span className="text3">{"Assuntos e Temas"}</span>
              <img
                src={
                  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/ftu2i6mf_expires_30_days.png"
                }
                className="image2"
              />
            </div>
          </div>
          <button className="button" onClick={() => alert("Pressed!")}>
            <span className="text4">{"SAIR DA CONTA"}</span>
          </button>
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default AjustesPages;
