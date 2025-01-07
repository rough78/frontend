import { create } from 'zustand'
import { AUTH_URL } from '@shared/api/base'
import { checkAuth } from '@shared/api/auth/auth'
import { apiInstance } from '@shared/api/base'

interface AuthStore {
  isAuthenticated: boolean
  login: (provider: string) => void
  logout: () => void
  checkAuthStatus: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  
  login: async (provider: string) => {
    console.log('Development mode:', import.meta.env.DEV)
    if (import.meta.env.DEV) {
      // 개발 모드에서는 MSW로 처리
      try {
        console.log('Sending request to MSW endpoint:', `/api/auth/${provider}/login`)
        await apiInstance.get(`/api/auth/${provider}/login`)
        set({ isAuthenticated: true })
      } catch (error) {
        console.error('로그인 실패:', error)
      }
    } else {
      // 운영 모드에서는 리다이렉트
      console.log('Redirecting to:', `${AUTH_URL}/${provider}`)
      window.location.href = `${AUTH_URL}/${provider}`
    }
  },
  
  logout: async () => {
    try {
      await apiInstance.post('/api/auth/logout')
      set({ isAuthenticated: false })
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  },
  
  checkAuthStatus: async () => {
    const isAuth = await checkAuth()
    set({ isAuthenticated: isAuth })
  }
}))
