export type KycDocumentType =
  | 'trade_license'
  | 'company_registration'
  | 'tax_certificate'
  | 'passport'
  | 'national_id'
  | 'bank_statement'
  | 'insurance_certificate'
  | 'guide_certification'
  | 'proof_of_address'

export type KycStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'expired'

export interface KycDocument {
  id: string
  providerId: string
  providerName?: string
  providerEmail?: string
  documentType: KycDocumentType
  documentNumber?: string
  fileUrl: string
  fileName?: string
  fileSizeBytes?: number
  expiryDate?: string
  status: KycStatus
  reviewNotes?: string
  reviewedBy?: string
  reviewedByName?: string
  reviewedAt?: string
  createdAt: string
  updatedAt?: string
}
