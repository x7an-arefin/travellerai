import { Booking } from './bookings.model'

export type NewBooking = Omit<Booking, 'id' | 'createdAt' | 'confirmedAt' | 'checkinTime'>
export type UpdateBooking = Partial<NewBooking>

export interface BookingListResponse {
  items: Booking[]
  nextCursor?: string | null
  hasMore?: boolean
  total?: number
}
