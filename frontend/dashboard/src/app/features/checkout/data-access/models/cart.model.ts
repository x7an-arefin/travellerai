export type CartItemType = 'hotel_stay' | 'vehicle_rental' | 'airport_transfer' | 'tour_package'

export interface CartItem {
  id: string
  type: CartItemType
  providerId: string
  providerName: string
  title: string
  subtitle: string
  imageUrl: string
  startDate: string
  endDate?: string
  quantityOrGuests: number
  unitPrice: number
  totalPrice: number
  securityDeposit?: number
  cancellationPolicy: 'flexible_24h' | 'moderate_5d' | 'non_refundable'
  metadata?: Record<string, any>
}

export interface SplitSettlementAllocation {
  totalAmount: number
  platformCommission: number
  refundableEscrowDeposit: number
  vendorPayouts: {
    providerId: string
    providerName: string
    serviceType: string
    netAmount: number
  }[]
}
