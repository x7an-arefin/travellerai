import { Coupon } from './campaigns.model'

export type CreateCouponInput = Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'usedCount'>
export type UpdateCouponInput = Partial<Coupon>

export interface CouponListResponse {
  items: Coupon[]
  total?: number
  nextCursor?: string | null
}
