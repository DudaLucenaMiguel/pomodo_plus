import React from "react"
import { useNavigate } from "react-router-dom"
import "./SideBar.css"

export default function SideBar() {
  const navigate = useNavigate()

  const navItems = [
    { label: "Histórico", path: "/historico", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/yao6rera_expires_30_days.png" },
    { label: "Cronômetro", path: "/cronometro", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/tfec9zbw_expires_30_days.png" },
    { label: "Ciclos", path: "/ciclos", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/vbsjvt2m_expires_30_days.png" },
    { label: "Ajustes", path: "/ajustes", img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YKqEVEQOUy/hr2o6e9i_expires_30_days.png" },
  ]

  return (
    <div className="sidebar">
      {navItems.map(({ label, path, img }) => (
        <button
          key={path}
          className="sidebar__button"
          onClick={() => navigate(path)}
        >
          <img src={img} alt={label} className="sidebar__icon" />
          <span className="sidebar__label">{label}</span>
        </button>
      ))}
    </div>
  )
}
