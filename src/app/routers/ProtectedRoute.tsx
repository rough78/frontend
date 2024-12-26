import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@app/auth/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus)
  
  useEffect(() => {
    const checkAuth = () => checkAuthStatus();
    checkAuth();
  }, [checkAuthStatus])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
