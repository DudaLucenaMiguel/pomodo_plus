// src/pages/TimerPages.jsx
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./TimerPages.css";
import SideBar from "../components/SideBar.jsx";
import TimerComponent from "../components/TimerComponent.jsx";
import { SessoesService } from "../services/api.service";

export default function TimerPage() {
  const { state } = useLocation();
  const [mode, setMode] = useState("idle");

  const defaults = useMemo(
    () => ({
      focusSec: 25 * 60,
      shortBreakSec: 5 * 60,
      longBreakSec: 15 * 60,
      cyclesBeforeLongBreak: 4,
      autostartNext: true,
    }),
    []
  );

  const merged = {
    id: state?.id ?? null, // opcional: id do ciclo escolhido
    name: state?.name ?? null,
    focusSec: state?.focusSec ?? defaults.focusSec,
    shortBreakSec: state?.shortBreakSec ?? defaults.shortBreakSec,
    longBreakSec: state?.longBreakSec ?? defaults.longBreakSec,
    cyclesBeforeLongBreak: state?.cyclesBeforeLongBreak ?? defaults.cyclesBeforeLongBreak,
    autostartNext: defaults.autostartNext,
    autoStartOnMount: !!state?.autoStartOnMount,
  };

  const backgroundColor = useMemo(() => {
    if (mode === "focus") return "#c62828";
    if (mode === "short") return "#1565c0";
    if (mode === "long") return "#f9a825";
    return "#222";
  }, [mode]);

  const handleRegisterCycle = async (p) => {
    const end = new Date();
    const start = new Date(end.getTime() - (Number(p?.durationSec || 0) * 1000));

    const raw = localStorage.getItem("usuario");
    const usuario = raw ? JSON.parse(raw) : null;
    const usuarioId = usuario?.id ?? null;
    if (!usuarioId) return;

    const payload = {
      usuario_id: usuarioId,
      ciclo_id: merged.id ?? null,
      tipo: String(p?.kind || mode || "focus"),
      inicio: start.toISOString(),
      fim: end.toISOString(),
      duracao_sec: Number(p?.durationSec || 0),
      status: "completed",
      titulo: merged.name || null,
    };

    try {
      await SessoesService.create(payload);
      // opcional: feedback visual (toast) ou refetch no Histórico via contexto/evento
    } catch (err) {
      console.error("Falha ao registrar sessão:", err);
    }
  };

  return (
    <div className="timer-page" style={{ "--dynamic-bg": backgroundColor }}>
      <div className="timer-page__content">
        <div className="timer-page__header">
          <span className="timer-page__title">Cronômetro</span>
        </div>

        <TimerComponent
          focusSec={merged.focusSec}
          shortBreakSec={merged.shortBreakSec}
          longBreakSec={merged.longBreakSec}
          cyclesBeforeLongBreak={merged.cyclesBeforeLongBreak}
          autostartNext={merged.autostartNext}
          autoStartOnMount={merged.autoStartOnMount}
          onModeChange={setMode}
          onRegisterCycle={handleRegisterCycle}
        />

        <SideBar />
      </div>
    </div>
  );
}
