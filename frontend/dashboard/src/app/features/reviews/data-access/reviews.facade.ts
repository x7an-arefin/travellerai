import { Injectable, inject } from '@angular/core'
import { ReviewsStore } from './store/reviews.store'
import { Review } from './models/reviews.model'
import { UpdateReviewStatusInput, CreateReviewResponseInput } from './models/reviews-api.types'

@Injectable({
  providedIn: 'root',
})
export class ReviewsFacade {
  private readonly store = inject(ReviewsStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.items
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly activeStatusFilter = this.store.activeStatusFilter
  readonly searchQuery = this.store.searchQuery
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId
  readonly isDrawerOpen = () => this.store.drawerMode() !== 'closed'

  readonly averageRating = this.store.averageRating
  readonly totalPublished = this.store.totalPublished
  readonly totalFlagged = this.store.totalFlagged

  loadAll(): Promise<void> {
    return this.store.loadAll()
  }

  setSearchQuery(q: string): void {
    this.store.searchQuery.set(q)
  }

  setStatusFilter(filter: string): void {
    this.store.activeStatusFilter.set(filter)
  }

  openReplyDrawer(review: Review): void {
    this.store.openReplyDrawer(review)
  }

  openDetailDrawer(review: Review): void {
    this.store.openDetailDrawer(review)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  updateStatus(id: string, input: UpdateReviewStatusInput): Promise<boolean> {
    return this.store.updateStatus(id, input)
  }

  submitResponse(input: CreateReviewResponseInput): Promise<boolean> {
    return this.store.submitResponse(input)
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
