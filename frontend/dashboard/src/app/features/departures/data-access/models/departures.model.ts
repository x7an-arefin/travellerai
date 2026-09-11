export interface Departure {
  id: string
  packageId: string
  packageTitle?: string
  destination?: string
  startDate: string
  endDate: string
  capacity: number
  bookedCount: number
  minParticipants: number
  assignedGuideName?: string
  status: 'available' | 'limited' | 'sold_out' | 'closed' | 'cancelled'
  meetingPoint?: string
}
