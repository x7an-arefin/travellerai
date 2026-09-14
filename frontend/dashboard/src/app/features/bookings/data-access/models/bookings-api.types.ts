import { Booking } from './bookings.model'

export type NewBooking = Omit<Booking, 'id' | 'createdAt' | 'confirmedAt' | 'checkinTime'>
export type UpdateBooking = Partial<Omit<Booking, 'id' | 'createdAt'>>

export interface BookingListResponse {
  items: Booking[]
  nextCursor?: string | null
  hasMore?: boolean
  total?: number
}
