import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./HistoricoPages.css"
import SideBar from "../components/SideBar"
import HistoricoCard from "../components/HistoricoCard"
import { useCurrentUsuario } from "../hooks/useAuthUser"
import { useSessoes } from "../hooks/useSessoes"
import { SessoesService } from "../services/api.service"

function parseDurationSeconds(inicio, fim) {
  if (!inicio) return 0
  const start = new Date(inicio).getTime()
  const end = fim ? new Date(fim).getTime() : start
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0
  return Math.max(0, Math.round((end - start) / 1000))
}

function normalizeStatus(status) {
  const normalized = String(status || "").toUpperCase()
  if (normalized === "CONCLUIDA" || normalized === "CONCLUÍDA") return "completed"
  if (normalized === "EM_ANDAMENTO" || normalized === "PAUSADA") return "completed"
  return "aborted"
}

function adaptSessao(apiSessao) {
  if (!apiSessao) return null
  const durationSec = parseDurationSeconds(apiSessao.inicio, apiSessao.fim)
  const dateISO = apiSessao.inicio ?? new Date().toISOString()
  const status = normalizeStatus(apiSessao.status)
  const cycleHint = apiSessao.ciclo_id ? ` · Ciclo ${apiSessao.ciclo_id}` : ""
  const title = `Sessão ${apiSessao.id}${cycleHint}`

  return {
    id: apiSessao.id,
    usuarioId: apiSessao.usuario_id,
    cicloId: apiSessao.ciclo_id,
    dateISO,
    title,
    durationSec,
    status,
  }
}

export default function HistoricoPages() {
  const navigate = useNavigate()
  const { usuario } = useCurrentUsuario()
  const usuarioId = usuario?.id ?? null
  const { data, loading, error } = useSessoes({ usuarioId })

  const [historico, setHistorico] = useState([])
  const [actionError, setActionError] = useState("")
  const [processingId, setProcessingId] = useState(null)

  const adaptedList = useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.map(adaptSessao).filter(Boolean)
  }, [data])

  useEffect(() => {
    setHistorico(adaptedList)
  }, [adaptedList])

  const handleDelete = async (id) => {
    try {
      setProcessingId(id)
      setActionError("")
      await SessoesService.remove(id)
      setHistorico((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      setActionError(err?.message || "Não foi possível remover a sessão.")
    } finally {
      setProcessingId(null)
    }
  }

  const handleOpen = (id) => {
    navigate("/timer", { state: { fromHistoryId: id } })
  }

  return (
    <div className="history-page">
      <div className="history-page__content">
        <div className="history-page__header">
          <span className="history-page__title">Histórico</span>
        </div>

        <div className="history-page__list">
          {loading ? (
            <div className="history-page__feedback">Carregando sessões...</div>
          ) : error ? (
            <div className="history-page__feedback history-page__feedback--error">{error}</div>
          ) : historico.length === 0 ? (
            <div className="history-page__feedback">Nenhuma sessão registrada até o momento.</div>
          ) : (
            historico.map((item) => (
              <HistoricoCard
                key={item.id}
                id={item.id}
                dateISO={item.dateISO}
                title={item.title}
                durationSec={item.durationSec}
                status={item.status}
                onDelete={handleDelete}
                onOpen={handleOpen}
                disabled={processingId === item.id}
              />
            ))
          )}
        </div>

        {actionError && <div className="history-page__feedback history-page__feedback--error">{actionError}</div>}

        <SideBar />
      </div>
    </div>
  )
}
