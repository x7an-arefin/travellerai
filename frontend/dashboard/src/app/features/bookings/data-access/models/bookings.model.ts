export type BookingServiceType = 'package' | 'hotel' | 'vehicle' | 'bundle'

export interface Booking {
  id: string
  bookingReference: string
  serviceType?: BookingServiceType
  travelerId?: string
  packageId?: string
  packageTitle?: string
  destination?: string
  departureId?: string
  departureDate?: string
  guestName: string
  guestEmail: string
  guestPhone?: string
  participantCount: number
  bookingStatus: 'confirmed' | 'pending_payment' | 'cancelled' | 'completed' | 'refunded'
  totalAmount: number
  paidAmount: number
  balanceDue?: number
  currency: string
  pickupLocation?: string
  specialRequests?: string
  checkinStatus: 'checked_in' | 'pending' | 'no_show'
  checkinTime?: string
  voucherUrl?: string
  qrCode?: string
  confirmedAt?: string
  createdAt?: string
  serviceDetails?: {
    hotelName?: string
    roomType?: string
    nights?: number
    vehicleModel?: string
    vehicleCategory?: string
    flightNumber?: string
    bundleItemCount?: number
  }
}

