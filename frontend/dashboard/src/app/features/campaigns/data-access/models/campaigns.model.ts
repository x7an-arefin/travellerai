export type DiscountType = 'percentage' | 'fixed'
export type CouponFunder = 'marketplace' | 'provider' | 'shared'
export type CouponStatus = 'active' | 'inactive' | 'expired'

export interface Coupon {
  id: string
  code: string
  description?: string
  discountType: DiscountType
  discountValue: number
  currency?: string
  minBookingValue?: number
  maxDiscount?: number
  providerId?: string
  startsAt?: string
  expiresAt?: string
  maxUses?: number
  usedCount: number
  funder: CouponFunder
  status: CouponStatus
  createdAt: string
  updatedAt?: string
}
