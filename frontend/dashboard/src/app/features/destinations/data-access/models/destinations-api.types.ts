import { Destination } from './destinations.model'

export type NewDestination = Omit<Destination, 'id' | 'createdAt' | 'activePackagesCount'>
export type UpdateDestination = Partial<NewDestination>

export interface DestinationListResponse {
  items: Destination[]
  nextCursor?: string | null
  hasMore?: boolean
  total?: number
}
