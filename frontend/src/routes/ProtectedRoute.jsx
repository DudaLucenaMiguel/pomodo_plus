// ProtectedRoute.jsx
import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ProtectedRoute() {
  const usuario = localStorage.getItem("usuario")
  const location = useLocation()
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
