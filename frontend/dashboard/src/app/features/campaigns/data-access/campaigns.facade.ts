import { Injectable, inject } from '@angular/core'
import { CampaignsStore } from './store/campaigns.store'
import { Coupon } from './models/campaigns.model'
import { CreateCouponInput, UpdateCouponInput } from './models/campaigns-api.types'

@Injectable({
  providedIn: 'root',
})
export class CampaignsFacade {
  private readonly store = inject(CampaignsStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.items
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly activeStatusFilter = this.store.activeStatusFilter
  readonly searchQuery = this.store.searchQuery
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId
  readonly isDrawerOpen = () => this.store.drawerMode() !== 'closed'

  readonly totalRedemptions = this.store.totalRedemptions
  readonly activeCouponsCount = this.store.activeCouponsCount

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

  openEditDrawer(item: Coupon): void {
    this.store.openEditDrawer(item)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  create(dto: CreateCouponInput): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdateCouponInput): Promise<boolean> {
    return this.store.update(id, dto)
  }

  toggleStatus(id: string): Promise<boolean> {
    return this.store.toggleStatus(id)
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
