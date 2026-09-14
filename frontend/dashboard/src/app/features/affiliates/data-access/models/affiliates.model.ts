export type AffiliateStatus = 'pending' | 'active' | 'suspended' | 'rejected'

export interface AffiliateAccount {
  id: string
  userId: string
  partnerName: string
  partnerEmail: string
  referralCode: string
  commissionRate: number // e.g. 8.5 (%)
  totalClicks: number
  totalBookings: number
  totalCommissionEarned: number
  pendingPayout: number
  currency: string
  status: AffiliateStatus
  referralUrl?: string
  createdAt: string
  updatedAt?: string
}
