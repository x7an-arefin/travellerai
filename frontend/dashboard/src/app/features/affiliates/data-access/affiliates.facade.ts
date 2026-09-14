import { Injectable, inject } from '@angular/core'
import { AffiliatesStore } from './store/affiliates.store'
import { CreateAffiliateInput, UpdateAffiliateInput } from './models/affiliates-api.types'
import { AffiliateAccount } from './models/affiliates.model'

@Injectable({
  providedIn: 'root',
})
export class AffiliatesFacade {
  private readonly store = inject(AffiliatesStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.items
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly activeStatusFilter = this.store.activeStatusFilter
  readonly searchQuery = this.store.searchQuery
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId
  readonly isDrawerOpen = () => this.store.drawerMode() !== 'closed'

  readonly totalCommissionSummary = this.store.totalCommissionSummary
  readonly pendingPayoutsSummary = this.store.pendingPayoutsSummary
  readonly totalBookingsAttributed = this.store.totalBookingsAttributed

  loadAll(): Promise<void> {
    return this.store.loadAll()
  }

  setSearchQuery(q: string): void {
    this.store.searchQuery.set(q)
  }

  setStatusFilter(filter: string): void {
    this.store.activeStatusFilter.set(filter)
  }

  openAddDrawer(): void {
    this.store.openAddDrawer()
  }

  openDetailDrawer(item: AffiliateAccount): void {
    this.store.openDetailDrawer(item)
  }

  openRateDrawer(item: AffiliateAccount): void {
    this.store.openRateDrawer(item)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  create(dto: CreateAffiliateInput): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdateAffiliateInput): Promise<boolean> {
    return this.store.update(id, dto)
  }

  updateStatus(id: string, status: 'pending' | 'active' | 'suspended' | 'rejected'): Promise<boolean> {
    return this.store.updateStatus(id, status)
  }

  updateCommissionRate(id: string, commissionRate: number): Promise<boolean> {
    return this.store.updateCommissionRate(id, commissionRate)
  }

  requestDelete(id: string): void {
    this.store.requestDelete(id)
  }

  cancelDelete(): void {
    this.store.cancelDelete()
  }

  remove(id: string): Promise<boolean> {
    return this.store.remove(id)
  }
}
