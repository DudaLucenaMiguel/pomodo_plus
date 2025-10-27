import React, { useMemo, useState } from "react";
import "./CicloCard.css";

function mm(sec) {
  if (!sec) return 0;
  return Math.round(sec / 60);
}

export default function CicloCard({
  id,
  name,
  focusSec,
  shortBreakSec,
  longBreakSec,
  cyclesBeforeLongBreak,
  tempo_estudo,
  tempo_descanso,
  tempo_entre_ciclos,
  repeticoes,
  onStart,
  onUpdate,
  onDelete,
}) {
  // 🔁 Adapta automaticamente os nomes conforme o backend
  const foco = focusSec ?? (tempo_estudo ? tempo_estudo * 60 : 0);
  const pausaCurta = shortBreakSec ?? (tempo_descanso ? tempo_descanso * 60 : 0);
  const pausaLonga = longBreakSec ?? (tempo_entre_ciclos ? tempo_entre_ciclos * 60 : 0);
  const ciclos = cyclesBeforeLongBreak ?? repeticoes ?? 0;
  const nome = name ?? `Ciclo ${id}`;

  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState(nome);
  const [formFocus, setFormFocus] = useState(mm(foco));
  const [formShort, setFormShort] = useState(mm(pausaCurta));
  const [formLong, setFormLong] = useState(mm(pausaLonga));
  const [formCycles, setFormCycles] = useState(ciclos);

  const handleStart = () => {
    if (typeof onStart === "function") {
      onStart({
        id,
        name: nome,
        focusSec: foco,
        shortBreakSec: pausaCurta,
        longBreakSec: pausaLonga,
        cyclesBeforeLongBreak: ciclos,
      });
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setFormName(nome);
    setFormFocus(mm(foco));
    setFormShort(mm(pausaCurta));
    setFormLong(mm(pausaLonga));
    setFormCycles(ciclos);
  };

  const handleSaveSingle = () => {
    const newName = String(formName || "").trim();
    const payload = {
      id,
      name: newName || nome,
      tempo_estudo: Math.max(1, Number(formFocus)),
      tempo_descanso: Math.max(0, Number(formShort)),
      tempo_entre_ciclos: Math.max(0, Number(formLong)),
      repeticoes: Math.max(1, Number(formCycles)),
    };

    if (typeof onUpdate === "function") onUpdate(payload);
    setEditing(false);
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") onDelete(id);
  };

  const details = useMemo(
    () => [
      { label: "Tempo de Foco", value: `${formFocus || mm(foco)} min`, type: "focus" },
      { label: "Tempo de Descanso", value: `${formShort || mm(pausaCurta)} min`, type: "short" },
      { label: "Número de Ciclos", value: `${formCycles || ciclos} ciclos`, type: "cycles" },
      { label: "Descanso entre Sessões", value: `${formLong || mm(pausaLonga)} min`, type: "long" },
    ],
    [formFocus, formShort, formLong, formCycles, foco, pausaCurta, pausaLonga, ciclos]
  );

  return (
    <div className="ciclo-card">
      <div className="ciclo-card__header">
        {editing ? (
          <input
            className="ciclo-card__title-input"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            maxLength={60}
          />
        ) : (
          <span className="ciclo-card__title">{nome}</span>
        )}

        <div className="ciclo-card__icons">
          {!editing && (
            <button
              className="ciclo-card__icon-btn"
              aria-label="Editar"
              onClick={handleEdit}
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
          )}
          <button
            className="ciclo-card__icon-btn ciclo-card__icon-btn--danger"
            aria-label="Deletar"
            onClick={handleDelete}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <div className="ciclo-card__details">
        {!editing ? (
          <>
            {details.map((d) => (
              <div key={d.type} className="ciclo-card__detail-row">
                <span className="ciclo-card__label">{d.label}</span>
                <div className="ciclo-card__value">
                  <span className="ciclo-card__value-text">{d.value}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Tempo de Foco</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="1"
                  step="1"
                  value={formFocus}
                  onChange={(e) => setFormFocus(e.target.value)}
                />
                <span className="ciclo-card__suffix">min</span>
              </div>
            </div>

            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Tempo de Descanso</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="0"
                  step="1"
                  value={formShort}
                  onChange={(e) => setFormShort(e.target.value)}
                />
                <span className="ciclo-card__suffix">min</span>
              </div>
            </div>

            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Número de Ciclos</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="1"
                  step="1"
                  value={formCycles}
                  onChange={(e) => setFormCycles(e.target.value)}
                />
                <span className="ciclo-card__suffix">ciclos</span>
              </div>
            </div>

            <div className="ciclo-card__detail-row">
              <span className="ciclo-card__label">Descanso entre Sessões</span>
              <div className="ciclo-card__value">
                <input
                  className="ciclo-card__input"
                  type="number"
                  min="0"
                  step="1"
                  value={formLong}
                  onChange={(e) => setFormLong(e.target.value)}
                />
                <span className="ciclo-card__suffix">min</span>
              </div>
            </div>
          </>
        )}
      </div>

      {!editing ? (
        <button className="ciclo-card__start-button" onClick={handleStart}>
          INICIAR SESSÃO
        </button>
      ) : (
        <button
          className="ciclo-card__start-button ciclo-card__start-button--confirm"
          onClick={handleSaveSingle}
        >
          SALVAR
        </button>
      )}
    </div>
  );
}
