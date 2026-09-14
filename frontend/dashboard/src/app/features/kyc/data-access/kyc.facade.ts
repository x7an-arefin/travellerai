import { Injectable, inject } from '@angular/core'
import { KycStore } from './store/kyc.store'
import { KycDocument } from './models/kyc.model'
import { UpdateKycDecisionInput } from './models/kyc-api.types'

@Injectable({
  providedIn: 'root',
})
export class KycFacade {
  private readonly store = inject(KycStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.items
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly activeStatusFilter = this.store.activeStatusFilter
  readonly searchQuery = this.store.searchQuery
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId
  readonly isDrawerOpen = () => this.store.drawerMode() !== 'closed'

  readonly pendingReviewCount = this.store.pendingReviewCount
  readonly approvedCount = this.store.approvedCount
  readonly rejectedCount = this.store.rejectedCount

  loadAll(): Promise<void> {
    return this.store.loadAll()
  }

  setSearchQuery(q: string): void {
    this.store.searchQuery.set(q)
  }

  setStatusFilter(filter: string): void {
    this.store.activeStatusFilter.set(filter)
  }

  openReviewDrawer(item: KycDocument): void {
    this.store.openReviewDrawer(item)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  reviewDocument(id: string, input: UpdateKycDecisionInput): Promise<boolean> {
    return this.store.reviewDocument(id, input)
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
