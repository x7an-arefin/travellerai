export interface PaginationMeta {
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ApiResult<T> {
  ok: boolean
  data: T
  meta?: PaginationMeta | null
  error?: string
  isFallback?: boolean // true = mock data shown (DEV only)
}
