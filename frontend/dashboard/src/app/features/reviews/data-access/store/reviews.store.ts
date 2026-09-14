import { Injectable, signal, computed, inject } from '@angular/core'
import { Review } from '../models/reviews.model'
import { ReviewsApiService } from '../services/reviews-api.service'
import { UpdateReviewStatusInput, CreateReviewResponseInput } from '../models/reviews-api.types'

@Injectable({
  providedIn: 'root',
})
export class ReviewsStore {
  private readonly api = inject(ReviewsApiService)

  readonly items = signal<Review[]>([])
  readonly selected = signal<Review | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly activeStatusFilter = signal<string>('all')
  readonly searchQuery = signal<string>('')
  readonly drawerMode = signal<'closed' | 'reply' | 'detail'>('closed')
  readonly deleteConfirmId = signal<string | null>(null)

  readonly filteredItems = computed(() => {
    const list = this.items()
    const query = this.searchQuery().toLowerCase().trim()
    const filter = this.activeStatusFilter()

    return list.filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.travelerName.toLowerCase().includes(query) ||
        item.packageTitle.toLowerCase().includes(query) ||
        (item.providerName && item.providerName.toLowerCase().includes(query))
      return matchesFilter && matchesQuery
    })
  })

  readonly averageRating = computed(() => {
    const list = this.items()
    if (!list.length) return 5.0
    const avg = list.reduce((sum, r) => sum + r.overallRating, 0) / list.length
    return Number(avg.toFixed(1))
  })

  readonly totalPublished = computed(() => {
    return this.items().filter(r => r.status === 'published').length
  })

  readonly totalFlagged = computed(() => {
    return this.items().filter(r => r.status === 'flagged').length
  })

  async loadAll(): Promise<void> {
    this.isLoading.set(true)
    try {
      const res = await this.api.list(this.activeStatusFilter())
      if (res.ok) {
        this.items.set(res.data.items)
      }
    } finally {
      this.isLoading.set(false)
    }
  }

  async updateStatus(id: string, input: UpdateReviewStatusInput): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.updateStatus(id, input)
      if (res.ok) {
        this.items.update(list => list.map(r => (r.id === id ? res.data : r)))
        if (this.selected()?.id === id) {
          this.selected.set(res.data)
        }
        return true
      }
      return false
    } finally {
      this.isLoading.set(false)
    }
  }

  async submitResponse(input: CreateReviewResponseInput): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.createResponse(input)
      if (res.ok) {
        this.items.update(list =>
          list.map(r => (r.id === input.reviewId ? { ...r, response: res.data } : r))
        )
        if (this.selected()?.id === input.reviewId) {
          this.selected.set({ ...this.selected()!, response: res.data })
        }
        this.closeDrawer()
        return true
      }
      return false
    } finally {
      this.isLoading.set(false)
    }
  }

  async remove(id: string): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.remove(id)
      if (res.ok) {
        this.items.update(list => list.filter(r => r.id !== id))
        this.deleteConfirmId.set(null)
        return true
      }
      return false
    } finally {
      this.isLoading.set(false)
    }
  }

  openReplyDrawer(review: Review): void {
    this.selected.set(review)
    this.drawerMode.set('reply')
  }

  openDetailDrawer(review: Review): void {
    this.selected.set(review)
    this.drawerMode.set('detail')
  }

  closeDrawer(): void {
    this.drawerMode.set('closed')
    this.selected.set(null)
  }

  requestDelete(id: string): void {
    this.deleteConfirmId.set(id)
  }

  cancelDelete(): void {
    this.deleteConfirmId.set(null)
  }
}
