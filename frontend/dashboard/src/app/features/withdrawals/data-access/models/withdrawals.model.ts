export interface WithdrawalRequest {
  id: string
  providerId: string
  providerName?: string
  payoutAccountId?: string
  payoutMethod?: 'bank_transfer' | 'stripe_connect' | 'wise' | 'paypal'
  accountLast4?: string
  amount: number
  feeAmount?: number
  netAmount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'rejected' | 'cancelled'
  rejectionReason?: string
  processedAt?: string
  createdAt: string
}
