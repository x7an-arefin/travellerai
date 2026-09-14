import { ProviderWallet, LedgerEntry, PayoutAccount } from './wallets.model'

export interface WalletDataResponse {
  wallet: ProviderWallet
  ledger: LedgerEntry[]
  payoutAccounts: PayoutAccount[]
}

export interface NewPayoutAccount {
  accountType: 'bank_account' | 'stripe_connect' | 'wise'
  accountHolderName: string
  institutionName: string
  accountNumber: string
  routingNumber?: string
  currency: string
}
