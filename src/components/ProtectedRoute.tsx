import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppStore } from "@/store/useAppStore"

export function ProtectedRoute() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
