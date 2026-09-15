import { CartItem, SplitSettlementAllocation } from './cart.model'

export interface CheckoutCustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupLocation?: string
  specialRequests?: string
}

export interface CheckoutPaymentInfo {
  method: 'card' | 'mfs' | 'bank'
  gateway?: 'stripe' | 'bkash' | 'sslcommerz' | 'paypal' | 'wallet'
  cardNumberLast4?: string
  currency?: string
}

export interface CheckoutPayload {
  customer: CheckoutCustomerInfo
  payment: CheckoutPaymentInfo
  items: CartItem[]
  splitAllocation: SplitSettlementAllocation
  subtotal: number
  bundleDiscountAmount: number
  platformServiceFee: number
  refundableSecurityDepositTotal: number
  grandTotal: number
  currencyCode: string
}

export interface CheckoutResult {
  bookingId: string
  bookingReference: string
  transactionId?: string
  transactionReference?: string
  totalAmount: number
  currency: string
  status: 'confirmed' | 'pending_payment'
  voucherUrl?: string
  createdAt: string
}
