import { useState, useCallback } from 'react'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { apiInstance } from '@shared/api/base'

export interface ApiError {
  message: string
  status?: number
  data?: any
}

export interface ApiState<T> {
  data: T | null
  isLoading: boolean
  error: ApiError | null
}

export interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: ApiError) => void
  initialData?: T
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export function useApi<T>(initialState?: T) {
  const [state, setState] = useState<ApiState<T>>({
    data: initialState || null,
    isLoading: false,
    error: null
  })

  const processError = (error: unknown): ApiError => {
    if (error instanceof AxiosError) {
      return {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      }
    }
    return {
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }

  const request = useCallback(async <R = T>(
    method: HttpMethod,
    endpoint: string,
    config?: {
      data?: unknown
      params?: unknown
      headers?: Record<string, string>
    } & Omit<AxiosRequestConfig, 'data' | 'params' | 'headers'>,
    apiOptions?: UseApiOptions<R>
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      let response: R

      switch (method) {
        case 'get':
          response = await apiInstance.get<R>(endpoint, config)
          break
        case 'post':
          response = await apiInstance.post<R>(endpoint, config?.data, config)
          break
        case 'put':
          response = await apiInstance.put<R>(endpoint, config?.data, config)
          break
        case 'delete':
          response = await apiInstance.delete<R>(endpoint, config)
          break
        case 'patch':
          response = await apiInstance.patch<R>(endpoint, config?.data, config)
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }

      setState({ data: response as unknown as T, isLoading: false, error: null })
      apiOptions?.onSuccess?.(response)
      return response
    } catch (error) {
      const processedError = processError(error)
      setState({ data: null, isLoading: false, error: processedError })
      apiOptions?.onError?.(processedError)
      throw processedError
    }
  }, [])

  const get = useCallback(<R = T>(
    endpoint: string,
    config?: {
      params?: unknown
      headers?: Record<string, string>
    } & Omit<AxiosRequestConfig, 'data' | 'params' | 'headers' | 'method'>,
    apiOptions?: UseApiOptions<R>
  ) => {
    return request<R>('get', endpoint, config, apiOptions)
  }, [request])

  const post = useCallback(<R = T>(
    endpoint: string,
    data?: unknown,
    config?: {
      params?: unknown
      headers?: Record<string, string>
    } & Omit<AxiosRequestConfig, 'data' | 'params' | 'headers' | 'method'>,
    apiOptions?: UseApiOptions<R>
  ) => {
    return request<R>('post', endpoint, { ...config, data }, apiOptions)
  }, [request])

  return {
    ...state,
    request,
    get,
    post,
  }
}