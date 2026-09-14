export interface ProviderWallet {
  id: string
  providerId: string
  providerName?: string
  availableBalance: number
  pendingBalance: number
  reservedBalance: number
  withdrawnBalance: number
  negativeBalance?: number
  currency: string
  updatedAt?: string
}

export interface LedgerEntry {
  id: string
  entryType: 'credit' | 'debit'
  accountType: 'customer_payment' | 'provider_earning' | 'platform_commission' | 'service_fee' | 'tax' | 'gateway_fee' | 'coupon_discount' | 'wallet_credit' | 'refund' | 'chargeback' | 'withdrawal' | 'manual_adjustment'
  referenceType: 'booking' | 'transaction' | 'withdrawal' | 'refund' | 'dispute' | 'manual'
  referenceId: string
  providerId?: string
  amount: number
  currency: string
  balanceAfter?: number
  description?: string
  createdAt?: string
}

export interface PayoutAccount {
  id: string
  providerId: string
  accountType: 'bank_account' | 'stripe_connect' | 'wise'
  accountHolderName: string
  institutionName: string
  accountNumberMasked: string
  routingNumberMasked?: string
  currency: string
  isDefault: boolean
  verificationStatus: 'verified' | 'pending' | 'rejected'
}
