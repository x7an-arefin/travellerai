export interface Quotation {
  id: string
  inquiryId: string
  providerId: string
  providerName?: string
  title: string
  itineraryDetails?: { day: number; title: string; notes?: string }[]
  inclusions?: string[]
  exclusions?: string[]
  totalPrice: number
  currency: string
  depositAmount?: number
  terms?: string
  validUntil: string
  status: 'draft' | 'submitted' | 'accepted' | 'rejected' | 'expired' | 'revoked'
  createdAt?: string
}

export interface TripInquiry {
  id: string
  travelerId?: string
  contactName: string
  contactEmail: string
  destinationName: string
  destinationId?: string
  startDate?: string
  endDate?: string
  travelerCount: number
  estimatedBudget: number
  budgetCurrency: string
  preferences?: {
    accommodationStyle?: string
    travelPace?: string
    activities?: string[]
  }
  specialRequests?: string
  status: 'open' | 'quoted' | 'accepted' | 'booked' | 'expired' | 'closed'
  quotationCount?: number
  quotations?: Quotation[]
  expiresAt?: string
  createdAt?: string
}
