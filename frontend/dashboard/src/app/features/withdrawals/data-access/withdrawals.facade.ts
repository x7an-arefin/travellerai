import { Injectable, inject } from '@angular/core'
import { WithdrawalsStore } from './store/withdrawals.store'
import { UpdateWithdrawalRequest } from './models/withdrawals-api.types'

@Injectable({ providedIn: 'root' })
export class WithdrawalsFacade {
  private readonly store = inject(WithdrawalsStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.entities
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly hasError = this.store.hasError
  readonly errorMessage = this.store.errorMessage

  readonly isDrawerOpen = this.store.isDrawerOpen
  readonly drawerMode = this.store.drawerMode
  readonly statusFilter = this.store.statusFilter

  loadAll(): void {
    this.store.loadAll()
  }

  setStatusFilter(status: string): void {
    this.store.setStatusFilter(status)
  }

  openDetailDrawer(id: string): void {
    this.store.openDetailDrawer(id)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  update(id: string, dto: UpdateWithdrawalRequest): Promise<boolean> {
    return this.store.update(id, dto)
  }
}
