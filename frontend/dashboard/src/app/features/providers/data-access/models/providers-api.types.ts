import { Provider } from './providers.model'

export type NewProvider = Omit<Provider, 'id' | 'createdAt' | 'rating' | 'totalBookings'>
export type UpdateProvider = Partial<NewProvider>

export interface ProviderListResponse {
  items: Provider[]
  nextCursor?: string | null
  hasMore?: boolean
  total?: number
}
