import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SideBar.css";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Histórico", path: "/historico", icon: "calendar_month" },
    { label: "Cronômetro", path: "/cronometro", icon: "timer" },
    { label: "Ciclos", path: "/ciclos", icon: "refresh" },
    { label: "Ajustes", path: "/ajustes", icon: "settings" },
  ];

  return (
    <div className="sidebar">
      {navItems.map(({ label, path, icon }) => {
        const isActive =
          location.pathname === path ||
          location.pathname.startsWith(`${path}/`);

        return (
          <button
            key={path}
            type="button"
            className={`sidebar__button${
              isActive ? " sidebar__button--active" : ""
            }`}
            onClick={() => navigate(path)}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="sidebar__label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
