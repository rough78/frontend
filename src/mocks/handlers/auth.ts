import { http, HttpResponse } from 'msw'

export const authHandlers = [
  http.get('/api/auth/check', () => {
    return HttpResponse.json({
      access_token_is_expired: false,
      refresh_token_is_expired: false
    })
  }),
  
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ success: true })
  }),

  // 소셜 로그인 핸들러들
  http.get('/api/auth/google/login', () => {
    return HttpResponse.json({ success: true })
  }),

  http.get('/api/auth/naver/login', () => {
    return HttpResponse.json({ success: true })
  }),

  http.get('/api/auth/facebook/login', () => {
    return HttpResponse.json({ success: true })
  })
]
