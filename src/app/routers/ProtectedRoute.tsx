import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@app/auth/useAuthStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true)
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus)
  
  useEffect(() => {
    const check = async () => {
      try {
        await checkAuthStatus()
      } catch (error) {
        console.error('인증 확인 실패:', error)
      } finally {
        setIsChecking(false)
      }
    }
    check()
  }, [checkAuthStatus, location])

  if (isChecking) {
    return <div>인증 상태 확인 중...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}