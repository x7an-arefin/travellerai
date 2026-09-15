export interface TripPassDay {
  day: number
  date: string
  theme: string
}

export interface TripPassInfo {
  bookingId: string
  reference: string
  title: string
  destination: string
  dates: string
  status: 'active' | 'completed' | 'pending'
  guestName: string
  guestEmail: string
  totalAmount: number
  currency: string
  qrCodeData: string
  days: TripPassDay[]
}

export interface ConciergeMessage {
  id?: string
  sender: 'ai' | 'user'
  text: string
  timestamp: string
  actionPill?: string
}
