import { Injectable, inject } from '@angular/core'
import { InquiriesStore } from './store/inquiries.store'
import { NewTripInquiry, UpdateTripInquiry, NewQuotation } from './models/inquiries-api.types'

@Injectable({ providedIn: 'root' })
export class InquiriesFacade {
  private readonly store = inject(InquiriesStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.entities
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly hasError = this.store.hasError
  readonly errorMessage = this.store.errorMessage

  readonly isDrawerOpen = this.store.isDrawerOpen
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId

  readonly searchQuery = this.store.searchQuery
  readonly statusFilter = this.store.activeStatusFilter

  loadAll(): void {
    this.store.loadAll()
  }

  setSearchQuery(query: string): void {
    this.store.setSearchQuery(query)
  }

  setStatusFilter(status: string): void {
    this.store.setStatusFilter(status)
  }

  openCreateDrawer(): void {
    this.store.openCreateDrawer()
  }

  openQuoteDrawer(id: string): void {
    this.store.openQuoteDrawer(id)
  }

  openDetailDrawer(id: string): void {
    this.store.openDetailDrawer(id)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  requestDeleteConfirm(id: string): void {
    this.store.requestDeleteConfirm(id)
  }

  cancelDelete(): void {
    this.store.cancelDelete()
  }

  create(dto: NewTripInquiry): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdateTripInquiry): Promise<boolean> {
    return this.store.update(id, dto)
  }

  submitQuotation(inquiryId: string, quote: NewQuotation): Promise<boolean> {
    return this.store.submitQuotation(inquiryId, quote)
  }

  remove(id: string): Promise<boolean> {
    return this.store.remove(id)
  }
}
