import { Departure } from './departures.model'

export type CreateDepartureInput = Omit<Departure, 'id' | 'createdAt' | 'updatedAt' | 'bookedCount' | 'availableCount' | 'passengers'>
export type UpdateDepartureInput = Partial<Departure>

export interface DepartureListResponse {
  items: Departure[]
  total?: number
  nextCursor?: string | null
}
