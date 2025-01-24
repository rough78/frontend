import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface IProviders {
    readonly children: JSX.Element
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
