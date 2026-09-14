export type DepartureStatus = 'available' | 'limited' | 'sold_out' | 'closed' | 'cancelled' | 'completed'

export interface DeparturePassenger {
  id: string
  bookingReference: string
  guestName: string
  guestEmail: string
  guestPhone?: string
  participantCount: number
  pickupLocation?: string
  specialRequests?: string
  checkinStatus: 'checked_in' | 'pending' | 'no_show'
}

export interface Departure {
  id: string
  packageId: string
  packageTitle?: string
  destination?: string
  departureCode: string
  startDate: string
  endDate: string
  capacity: number
  bookedCount: number
  availableCount: number
  minParticipants: number
  assignedGuideId?: string
  assignedGuideName?: string
  priceOverride?: number
  bookingCutoffHours?: number
  meetingPoint?: string
  internalNotes?: string
  status: DepartureStatus
  passengers?: DeparturePassenger[]
  createdAt?: string
  updatedAt?: string
}
