import { apiInstance } from '@shared/api/base'

interface AuthResponse {
  access_token_is_expired: boolean
  refresh_token_is_expired: boolean
}

export const checkAuth = async () => {
  try {
    const response = await apiInstance.get<AuthResponse>('/api/auth/check')
    console.log('Auth check response:', response)
    
    // 토큰이 모두 만료되지 않았다면 인증된 상태로 간주
    return !response.access_token_is_expired && !response.refresh_token_is_expired
    
  } catch (error) {
    console.error('Auth check error:', error)
    return false
  }
}