import { AffiliateAccount } from './affiliates.model'

export type CreateAffiliateInput = Omit<AffiliateAccount, 'id' | 'createdAt' | 'updatedAt' | 'totalClicks' | 'totalBookings' | 'totalCommissionEarned' | 'pendingPayout'>
export type UpdateAffiliateInput = Partial<AffiliateAccount>

export interface AffiliateListResponse {
  items: AffiliateAccount[]
  total?: number
  nextCursor?: string | null
}
