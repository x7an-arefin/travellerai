import { MarketplaceUser } from './users.model'

export interface ListUsersApiResponse {
  items: MarketplaceUser[]
  nextCursor?: string | null
  total?: number
  hasMore?: boolean
}

export interface UserApiResponse<T> {
  ok: boolean
  data?: T
  error?: string
}
