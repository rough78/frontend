import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions, type QueryKey } from '@tanstack/react-query'
import { apiInstance } from '@shared/api/base'
import type { AxiosError } from 'axios'

export type ApiError = {
  message: string
  status?: number
  data?: any
}

export const useApiQuery = <TData>(
  queryKey: QueryKey,
  endpoint: string,
  options?: UseQueryOptions<TData, ApiError>
) => {
  return useQuery<TData, ApiError>({
    queryKey,
    queryFn: async () => {
      const response = await apiInstance.get<TData>(endpoint)
      return response
    },
    ...options,
  })
}

export const useApiMutation = <TData, TVariables>(
  endpoint: string,
  method: 'post' | 'put' | 'patch' | 'delete',
  options?: UseMutationOptions<TData, AxiosError, TVariables>
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const response = await apiInstance[method]<TData>(endpoint, variables)
      return response
    },
    ...options,
  })
}
