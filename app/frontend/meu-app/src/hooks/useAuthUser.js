import { useMemo } from "react"
import useFetch from "./useFetch"
import { withAbort } from "../services/http"
import { UsuariosService } from "../services/api.service"

function parseAuthToken(rawToken) {
  if (!rawToken) return null
  try {
    const parsed = JSON.parse(rawToken)
    if (!parsed || typeof parsed !== "object") return null
    if (!parsed.email) return null
    return {
      email: String(parsed.email).trim(),
      remember: Boolean(parsed.remember),
      ts: parsed.ts ?? null,
    }
  } catch {
    return null
  }
}

function buildSkipResponse() {
  const resolved = Promise.resolve([])
  return { promise: resolved, abort: () => {} }
}

export function useAuthToken() {
  if (typeof window === "undefined") {
    return { token: null }
  }
  const rawToken = window.localStorage.getItem("auth_token")
  const token = parseAuthToken(rawToken)
  return { token }
}

export function useCurrentUsuario() {
  const { token } = useAuthToken()
  const emailKey = token?.email?.toLowerCase() ?? ""

  const { data, loading, error } = useFetch(
    () => {
      if (!emailKey) return buildSkipResponse()
      return withAbort((signal) => UsuariosService.list(null, signal))
    },
    [emailKey]
  )

  const usuario = useMemo(() => {
    if (!emailKey || !Array.isArray(data)) return null
    return data.find((item) => String(item.email).toLowerCase() === emailKey) ?? null
  }, [data, emailKey])

  return {
    token,
    usuario,
    loading: emailKey ? loading : false,
    error,
  }
}

