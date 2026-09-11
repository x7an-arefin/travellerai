export interface Provider {
  id: string
  ownerId?: string
  legalName: string
  displayName: string
  slug?: string
  providerType: 'agency' | 'tour_operator' | 'guide' | 'activity_provider' | 'transport_operator'
  registrationNumber?: string
  taxId?: string
  country: string
  address?: string
  contactEmail: string
  contactPhone?: string
  website?: string
  logoUrl?: string
  coverImage?: string
  description?: string
  languages?: string[]
  operatingDestinations?: string[]
  commissionRate: number
  kycStatus: 'not_submitted' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  approvalStatus: 'pending' | 'approved' | 'suspended' | 'rejected'
  rating: number
  totalBookings: number
  verifiedBadge: boolean
  isWithdrawalRestricted: boolean
  riskLevel: 'low' | 'medium' | 'high'
  createdAt?: string
}
