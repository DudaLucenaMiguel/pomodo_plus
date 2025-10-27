import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HistoricoPages.css";
import SideBar from "../components/SideBar";
import HistoricoCard from "../components/HistoricoCard";
import { useSessoes } from "../hooks/useSessoes";
import { SessoesService } from "../services/api.service";

function toISO(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function sec(v, fb = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fb;
}

function diffSec(a, b) {
  const A = new Date(a).getTime();
  const B = new Date(b).getTime();
  if (!Number.isFinite(A) || !Number.isFinite(B)) return null;
  return Math.max(0, Math.round((B - A) / 1000));
}

// Aceita múltiplas convenções de nomes do backend
function mapSessaoDTO(dto) {
  const id = dto.id ?? dto.sessao_id ?? dto.codigo ?? String(Math.random());

  const start =
    dto.dateISO ??
    dto.dataISO ??
    dto.inicio ??
    dto.start ??
    dto.start_time ??
    dto.criado_em ??
    dto.created_at;

  const end =
    dto.fim ??
    dto.end ??
    dto.end_time ??
    dto.encerrado_em ??
    dto.updated_at;

  const duration =
    dto.durationSec ??
    dto.duracaoSec ??
    dto.duracao ??
    (start && end ? diffSec(start, end) : null) ??
    0;

  const status =
    dto.status ??
    dto.estado ??
    (end ? "completed" : "aborted");

  const title =
    dto.title ??
    dto.titulo ??
    dto.assunto_nome ??
    dto.assunto ??
    dto.tema_nome ??
    dto.tema ??
    "Sessão";

  return {
    id,
    dateISO: toISO(start) ?? new Date().toISOString(),
    title: String(title),
    durationSec: sec(duration, 0),
    status: String(status),
  };
}

export default function HistoricoPages() {
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("usuario");
  const usuario = rawUser ? JSON.parse(rawUser) : null;
  const usuarioId = usuario?.id ?? null;

  const { data, loading, error } = useSessoes({ usuarioId });
  const [removing, setRemoving] = useState(null);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) setLocalData(data);
  }, [data]);

  const historico = useMemo(() => {
    const list = Array.isArray(localData) ? localData : [];
    return list.map(mapSessaoDTO);
  }, [localData]);

  const handleDelete = async (id) => {
    try {
      setRemoving(id);
      await SessoesService.remove(id);
      // Atualiza lista local sem precisar recarregar
      setLocalData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao deletar sessão:", err);
    } finally {
      setRemoving(null);
    }
  };

  const handleOpen = (id) => {
    navigate("/timer", { state: { fromHistoryId: id } });
  };

  if (!usuarioId) {
    return (
      <div className="history-page">
        <div className="history-page__content">
          <div className="history-page__header">
            <span className="history-page__title">Histórico</span>
          </div>
          <div className="history-page__list">
            <div className="history-page__empty">Faça login para ver seu histórico.</div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-page__content">
          <div className="history-page__header">
            <span className="history-page__title">Histórico</span>
          </div>
          <div className="history-page__list">
            <div className="history-page__skeleton">Carregando sessões…</div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="history-page__content">
          <div className="history-page__header">
            <span className="history-page__title">Histórico</span>
          </div>
          <div className="history-page__list">
            <div className="history-page__error">{String(error.message || error)}</div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-page__content">
        <div className="history-page__header">
          <span className="history-page__title">Histórico</span>
        </div>

        <div className="history-page__list">
          {historico.length === 0 ? (
            <div className="history-page__empty">Nenhuma sessão encontrada.</div>
          ) : (
            historico.map((item) => (
              <HistoricoCard
                key={item.id}
                id={item.id}
                dateISO={item.dateISO}
                title={item.title}
                durationSec={item.durationSec}
                status={item.status}
                onDelete={() => handleDelete(item.id)}
                onOpen={() => handleOpen(item.id)}
                disabled={removing === item.id}
              />
            ))
          )}
        </div>

        <SideBar />
      </div>
    </div>
  );
}
