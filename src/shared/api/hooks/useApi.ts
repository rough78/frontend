import { useState, useCallback } from 'react'
import { AxiosRequestConfig } from 'axios'
import { apiInstance } from '@shared/api/base'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  initialData?: T
}

interface ApiState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useApi<T>(initialState?: T) {
  const [state, setState] = useState<ApiState<T>>({
    data: initialState || null,
    isLoading: false,
    error: null
  })

  const get = useCallback(async (
    endpoint: string,
    options?: AxiosRequestConfig,
    apiOptions?: UseApiOptions<T>
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await apiInstance.get<T>(endpoint, options)
      setState({ data: response, isLoading: false, error: null })
      apiOptions?.onSuccess?.(response)
      return response
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred')
      setState({ data: null, isLoading: false, error: errorObj })
      apiOptions?.onError?.(errorObj)
      throw errorObj
    }
  }, [])

  const post = useCallback(async (
    endpoint: string,
    data?: any,
    options?: AxiosRequestConfig,
    apiOptions?: UseApiOptions<T>
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await apiInstance.post<T>(endpoint, data, options)
      setState({ data: response, isLoading: false, error: null })
      apiOptions?.onSuccess?.(response)
      return response
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An unknown error occurred')
      setState({ data: null, isLoading: false, error: errorObj })
      apiOptions?.onError?.(errorObj)
      throw errorObj
    }
  }, [])

  return {
    ...state,
    get,
    post,
  }
}
