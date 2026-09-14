import { Injectable, inject } from '@angular/core'
import { WalletsStore } from './store/wallets.store'
import { NewPayoutAccount } from './models/wallets-api.types'

@Injectable({ providedIn: 'root' })
export class WalletsFacade {
  private readonly store = inject(WalletsStore)

  readonly wallet = this.store.wallet
  readonly ledger = this.store.filteredLedger
  readonly allLedger = this.store.ledger
  readonly payoutAccounts = this.store.payoutAccounts
  readonly isLoading = this.store.isLoading
  readonly hasError = this.store.hasError
  readonly errorMessage = this.store.errorMessage
  readonly ledgerFilter = this.store.ledgerFilter

  loadWalletData(): void {
    this.store.loadWalletData()
  }

  setLedgerFilter(filter: string): void {
    this.store.setLedgerFilter(filter)
  }

  addPayoutAccount(dto: NewPayoutAccount): Promise<boolean> {
    return this.store.addPayoutAccount(dto)
  }
}
