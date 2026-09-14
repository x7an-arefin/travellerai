import { KycDocument } from './kyc.model'

export type UpdateKycDecisionInput = {
  status: 'approved' | 'rejected' | 'under_review'
  reviewNotes?: string
}

export interface KycListResponse {
  items: KycDocument[]
  total?: number
  pendingCount?: number
  nextCursor?: string | null
}
