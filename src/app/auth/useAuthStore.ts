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
  
  login: (provider: string) => {
    window.location.href = `${AUTH_URL}/${provider}`
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
