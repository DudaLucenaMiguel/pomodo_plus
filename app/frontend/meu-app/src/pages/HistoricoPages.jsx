import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./HistoricoPages.css"
import SideBar from "../components/SideBar"
import HistoricoCard from "../components/HistoricoCard"
import { useSessoes } from "../hooks/useSessoes"
import { SessoesService } from "../services/api.service"

function diffInSeconds(startISO, endISO) {
  if (!startISO || !endISO) return 0
  const start = new Date(startISO)
  const end = new Date(endISO)
  const diff = Math.round((end.getTime() - start.getTime()) / 1000)
  return Number.isFinite(diff) && diff > 0 ? diff : 0
}

function mapSessao(raw) {
  if (!raw) return null

  const id = raw.id
  const durationSec = diffInSeconds(raw.inicio, raw.fim)
  const status = String(raw.status || "").toUpperCase()
  const completedStatuses = new Set([
    "CONCLUIDA",
    "EM_ANDAMENTO",
    "PAUSADA",
    "PLANEJADA",
  ])
  const abortedStatuses = new Set(["INTERROMPIDA", "CANCELADA"])
  let friendlyStatus = "completed"
  if (abortedStatuses.has(status)) friendlyStatus = "aborted"
  else if (completedStatuses.has(status)) friendlyStatus = "completed"
  else friendlyStatus = "completed"

  return {
    id,
    cicloId: raw.ciclo_id,
    dateISO: raw.inicio,
    durationSec,
    status: friendlyStatus,
    title:
      raw.titulo ??
      raw.tema_titulo ??
      raw.assunto_titulo ??
      (id ? `Sessão #${id}` : "Sessão"),
  }
}

function getCurrentUserId() {
  if (typeof window === "undefined") return 1
  const stored = window.localStorage.getItem("auth_user_id")
  const parsed = Number(stored)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export default function HistoricoPages() {
  const navigate = useNavigate()
  const userId = getCurrentUserId()
  const { data, loading, error } = useSessoes({ usuario_id: userId })

  const [historico, setHistorico] = useState([])

  useEffect(() => {
    if (!Array.isArray(data)) return
    setHistorico(data.map(mapSessao).filter(Boolean))
  }, [data])

  const hasItems = historico.length > 0

  const primaryMessage = useMemo(() => {
    if (loading) return { text: "Carregando sessões...", tone: "info" }
    if (!loading && error && !hasItems)
      return { text: String(error), tone: "error" }
    if (!loading && !error && !hasItems)
      return { text: "Nenhuma sessão encontrada.", tone: "info" }
    return null
  }, [loading, error, hasItems])

  const secondaryError = !loading && error && hasItems ? String(error) : null

  const handleDelete = (id) => {
    if (!id) return

    SessoesService.remove(id)
      .catch((err) => console.error("Erro ao remover sessão:", err))
      .finally(() => {
        setHistorico((prev) => prev.filter((s) => s.id !== id))
      })
  }

  const handleOpen = (id) => {
    const sessao = historico.find((item) => item.id === id)
    if (sessao?.cicloId) {
      navigate("/timer", {
        state: { cicloId: sessao.cicloId, autoStartOnMount: true },
      })
      return
    }

    navigate("/timer", { state: { fromHistoryId: id } })
  }

  return (
    <div className="history-page">
      <div className="history-page__content">
        <div className="history-page__header">
          <span className="history-page__title">Histórico</span>
        </div>

        <div className="history-page__list">
          {primaryMessage && (
            <p
              className={`history-page__message${
                primaryMessage.tone === "error"
                  ? " history-page__message--error"
                  : ""
              }`}
            >
              {primaryMessage.text}
            </p>
          )}

          {secondaryError && (
            <p className="history-page__message history-page__message--error">
              {secondaryError}
            </p>
          )}

          {hasItems &&
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
              />
            ))}
        </div>

        <SideBar />
      </div>
    </div>
  )
}
