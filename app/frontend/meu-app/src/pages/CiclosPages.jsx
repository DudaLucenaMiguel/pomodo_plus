import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import CicloCard from "../components/CicloCard";
import "./CiclosPages.css";
import { useCiclos } from "../hooks/useCiclos";
import { CiclosService } from "../services/api.service";

export default function CiclosPages() {
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("usuario");
  const usuario = rawUser ? JSON.parse(rawUser) : null;
  const usuarioId = usuario?.id ?? null;

  const { data, loading, error } = useCiclos({ usuarioId });
  const [localData, setLocalData] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newCycle, setNewCycle] = useState({
    nome: "",
    focoMin: 25,
    pausaCurtaMin: 5,
    pausaLongaMin: 15,
    repeticoes: 4,
  });

  useEffect(() => {
    if (Array.isArray(data)) setLocalData(data);
  }, [data]);

  const handleCreate = async () => {
    try {
      const payload = {
        usuario_id: usuarioId,
        tempo_estudo: newCycle.focoMin,
        tempo_descanso: newCycle.pausaCurtaMin,
        tempo_entre_ciclos: newCycle.pausaLongaMin,
        repeticoes: newCycle.repeticoes,
      };

      const created = await CiclosService.create(payload);

      if (created && created.id) {
        setLocalData((prev) => [
          ...prev,
          {
            ...created,
            focoMin: created.tempo_estudo,
            pausaCurtaMin: created.tempo_descanso,
            pausaLongaMin: created.tempo_entre_ciclos,
          },
        ]);
      }

      setCreating(false);
      setNewCycle({
        nome: "",
        focoMin: 25,
        pausaCurtaMin: 5,
        pausaLongaMin: 15,
        repeticoes: 4,
      });
    } catch (err) {
      console.error("Erro ao criar ciclo:", err);
    }
  };

  const handleUpdate = async (upd) => {
    try {
      const id = upd.id;
      const payload = {
        ...(upd.tempo_estudo !== undefined && { tempo_estudo: Number(upd.tempo_estudo) }),
        ...(upd.tempo_descanso !== undefined && { tempo_descanso: Number(upd.tempo_descanso) }),
        ...(upd.tempo_entre_ciclos !== undefined && { tempo_entre_ciclos: Number(upd.tempo_entre_ciclos) }),
        ...(upd.repeticoes !== undefined && { repeticoes: Number(upd.repeticoes) }),
        ...(upd.name && { nome: String(upd.name).trim() }),
      };

      const resp = await CiclosService.update(id, payload);

      setLocalData((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          if (
            resp &&
            (resp.tempo_estudo !== undefined ||
              resp.tempo_descanso !== undefined ||
              resp.tempo_entre_ciclos !== undefined ||
              resp.repeticoes !== undefined ||
              resp.nome !== undefined)
          ) {
            return { ...c, ...resp };
          }
          return { ...c, ...payload };
        })
      );
    } catch (err) {
      console.error("Erro ao atualizar ciclo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CiclosService.remove(id);
      setLocalData((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Erro ao excluir ciclo:", err);
    }
  };

  // Navega para o timer com tempos em segundos e auto-start
  const handleStart = (p) => {
    navigate("/timer", {
      state: {
        id: p?.id ?? null,
        name: p?.name ?? null,
        focusSec: Number(p?.focusSec) || 25 * 60,
        shortBreakSec: Number(p?.shortBreakSec) || 5 * 60,
        longBreakSec: Number(p?.longBreakSec) || 15 * 60,
        cyclesBeforeLongBreak: Number(p?.cyclesBeforeLongBreak) || 4,
        autoStartOnMount: true,
      },
      replace: false,
    });
  };

  if (loading) {
    return (
      <div className="cycles-page">
        <div className="cycles-page__content">
          <div className="cycles-page__header">
            <span className="cycles-page__title">Seus Ciclos</span>
          </div>
          <div className="cycles-page__list">
            <div className="cycles-page__skeleton">Carregando…</div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cycles-page">
        <div className="cycles-page__content">
          <div className="cycles-page__header">
            <span className="cycles-page__title">Seus Ciclos</span>
          </div>
          <div className="cycles-page__list">
            <div className="cycles-page__error">{String(error.message || error)}</div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }

  return (
    <div className="cycles-page">
      <div className="cycles-page__content">
        <div className="cycles-page__header">
          <span className="cycles-page__title">Seus Ciclos</span>
        </div>

        <div className="cycles-page__list">
          {creating && (
            <div className="ciclo-card">
              <div className="ciclo-card__header">
                <input
                  type="text"
                  className="ciclo-card__title-input"
                  placeholder="Nome do ciclo"
                  value={newCycle.nome}
                  onChange={(e) =>
                    setNewCycle((prev) => ({ ...prev, nome: e.target.value }))
                  }
                />
              </div>

              <div className="ciclo-card__details">
                <div className="ciclo-card__detail-row">
                  <span className="ciclo-card__label">Foco (min)</span>
                  <input
                    type="number"
                    className="ciclo-card__input"
                    value={newCycle.focoMin}
                    onChange={(e) =>
                      setNewCycle((prev) => ({
                        ...prev,
                        focoMin: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="ciclo-card__detail-row">
                  <span className="ciclo-card__label">Pausa curta (min)</span>
                  <input
                    type="number"
                    className="ciclo-card__input"
                    value={newCycle.pausaCurtaMin}
                    onChange={(e) =>
                      setNewCycle((prev) => ({
                        ...prev,
                        pausaCurtaMin: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="ciclo-card__detail-row">
                  <span className="ciclo-card__label">Pausa longa (min)</span>
                  <input
                    type="number"
                    className="ciclo-card__input"
                    value={newCycle.pausaLongaMin}
                    onChange={(e) =>
                      setNewCycle((prev) => ({
                        ...prev,
                        pausaLongaMin: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="ciclo-card__detail-row">
                  <span className="ciclo-card__label">Repetições</span>
                  <input
                    type="number"
                    className="ciclo-card__input"
                    value={newCycle.repeticoes}
                    onChange={(e) =>
                      setNewCycle((prev) => ({
                        ...prev,
                        repeticoes: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <button
                className="ciclo-card__start-button ciclo-card__start-button--confirm"
                onClick={handleCreate}
              >
                Salvar ciclo
              </button>
            </div>
          )}

          {!creating && (
            <button
              className="ciclo-card__start-button"
              onClick={() => setCreating(true)}
            >
              + Novo ciclo
            </button>
          )}

          {localData.map((c) => (
            <CicloCard
              key={c.id}
              id={c.id}
              // nomes do backend
              tempo_estudo={c.tempo_estudo}
              tempo_descanso={c.tempo_descanso}
              tempo_entre_ciclos={c.tempo_entre_ciclos}
              repeticoes={c.repeticoes}
              // callbacks
              onStart={handleStart}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <SideBar />
      </div>
    </div>
  );
}
