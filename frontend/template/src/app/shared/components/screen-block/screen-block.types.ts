export type ScreenBlockNode = {
  id: string
  type: string
  component?: string
  config?: Record<string, unknown>
  bindings?: Record<string, string>
  events?: Record<string, string>
  permissions?: string[]
  children?: ScreenBlockNode[]
}

export type ScreenBlockEntry = {
  id: string
  label: string
  category: string
  variant: string
}

export type ScreenBlockState = {
  status: 'idle' | 'loading' | 'success' | 'error' | 'empty' | 'partial' | 'unauthorized' | 'offline'
  data: unknown
  error: string | null
  updatedAt: number | null
}

export type ScreenBlockMutationState = {
  status: 'idle' | 'pending' | 'success' | 'error' | 'conflict'
  data: unknown
  error: string | null
  updatedAt: number | null
  conflictDetails?: {
    serverData?: Record<string, unknown>
    clientData?: Record<string, unknown>
    conflictingFields?: string[]
  }
}

export type SortDefinition = {
  field: string
  direction: 'asc' | 'desc'
}

export type ScreenBlockQuery = {
  search: string
  filters: Record<string, string | string[]>
  numericRanges?: Record<string, { min?: number; max?: number }>
  relationFilters?: Record<string, string[]>
  sortField: string | null
  sortDirection: 'asc' | 'desc' | null
  multiSort?: SortDefinition[]
  page: number
  pageSize: number
  cursor: string | null
  viewMode?: 'table' | 'grid' | 'card'
}

export type ScreenBlockAction = {
  id: string
  payload: Record<string, unknown>
  onSuccess?: string[]
  onError?: string[]
}
