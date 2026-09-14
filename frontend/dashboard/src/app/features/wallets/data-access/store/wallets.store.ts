import { Injectable, signal, computed, inject } from '@angular/core'
import { ProviderWallet, LedgerEntry, PayoutAccount } from '../models/wallets.model'
import { NewPayoutAccount } from '../models/wallets-api.types'
import { WalletsApiService } from '../services/wallets-api.service'

@Injectable({ providedIn: 'root' })
export class WalletsStore {
  private readonly api = inject(WalletsApiService)

  readonly wallet = signal<ProviderWallet | null>(null)
  readonly ledger = signal<LedgerEntry[]>([])
  readonly payoutAccounts = signal<PayoutAccount[]>([])
  readonly isLoading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  readonly ledgerFilter = signal<string>('all')

  readonly hasError = computed(() => this.error() !== null)
  readonly errorMessage = computed(() => this.error())

  readonly filteredLedger = computed(() => {
    const filter = this.ledgerFilter()
    const entries = this.ledger()
    if (filter === 'all') return entries
    if (filter === 'credit' || filter === 'debit') return entries.filter(e => e.entryType === filter)
    return entries.filter(e => e.accountType === filter)
  })

  async loadWalletData(): Promise<void> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.getWalletData()
    this.isLoading.set(false)
    if (res.ok) {
      this.wallet.set(res.data.wallet)
      this.ledger.set(res.data.ledger)
      this.payoutAccounts.set(res.data.payoutAccounts)
    } else {
      this.error.set(res.error)
    }
  }

  setLedgerFilter(filter: string): void {
    this.ledgerFilter.set(filter)
  }

  async addPayoutAccount(dto: NewPayoutAccount): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.addPayoutAccount(dto)
    this.isLoading.set(false)
    if (res.ok) {
      this.payoutAccounts.update(prev => [...prev, res.data])
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }
}
