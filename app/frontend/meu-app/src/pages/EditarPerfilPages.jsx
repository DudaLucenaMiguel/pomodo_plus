import React from "react"
import SideBar from "../components/SideBar"
import "./EditarPerfilPages.css"

function EditarPerfilPages() {
  return (
    <div className="profile-edit-page">
      <div className="profile-edit-page__content">
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/zlewvgri_expires_30_days.png"
          className="profile-edit-page__banner"
          alt="Banner do perfil"
        />
        <div className="profile-edit-page__card">
          <div className="profile-edit-page__fields">
            <div className="profile-edit-page__field">
              <span className="profile-edit-page__label">Nome:</span>
              <div className="profile-edit-page__value">
                <span className="profile-edit-page__value-text">Fulano</span>
              </div>
            </div>
            <div className="profile-edit-page__field">
              <span className="profile-edit-page__label">e-mail:</span>
              <div className="profile-edit-page__value">
                <span className="profile-edit-page__value-text">fulano@email.com</span>
              </div>
            </div>
          </div>
          <button className="profile-edit-page__submit" onClick={() => alert("Pressed!")}>
            Salvar informações
          </button>
        </div>
        <SideBar />
      </div>
    </div>
  )
}

export default EditarPerfilPages
