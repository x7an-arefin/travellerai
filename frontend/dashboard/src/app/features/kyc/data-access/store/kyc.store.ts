import { Injectable, signal, computed, inject } from '@angular/core'
import { KycDocument } from '../models/kyc.model'
import { KycApiService } from '../services/kyc-api.service'
import { UpdateKycDecisionInput } from '../models/kyc-api.types'

@Injectable({
  providedIn: 'root',
})
export class KycStore {
  private readonly api = inject(KycApiService)

  readonly items = signal<KycDocument[]>([])
  readonly selected = signal<KycDocument | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly activeStatusFilter = signal<string>('all')
  readonly searchQuery = signal<string>('')
  readonly drawerMode = signal<'closed' | 'review'>('closed')
  readonly deleteConfirmId = signal<string | null>(null)

  readonly filteredItems = computed(() => {
    const list = this.items()
    const query = this.searchQuery().toLowerCase().trim()
    const filter = this.activeStatusFilter()

    return list.filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter
      const matchesQuery =
        !query ||
        item.documentType.toLowerCase().includes(query) ||
        (item.documentNumber && item.documentNumber.toLowerCase().includes(query)) ||
        (item.providerName && item.providerName.toLowerCase().includes(query)) ||
        (item.fileName && item.fileName.toLowerCase().includes(query))
      return matchesFilter && matchesQuery
    })
  })

  readonly pendingReviewCount = computed(() => {
    return this.items().filter(d => d.status === 'submitted' || d.status === 'under_review').length
  })

  readonly approvedCount = computed(() => {
    return this.items().filter(d => d.status === 'approved').length
  })

  readonly rejectedCount = computed(() => {
    return this.items().filter(d => d.status === 'rejected').length
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

  async reviewDocument(id: string, input: UpdateKycDecisionInput): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.review(id, input)
      if (res.ok) {
        this.items.update(list => list.map(d => (d.id === id ? res.data : d)))
        if (this.selected()?.id === id) {
          this.selected.set(res.data)
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
        this.items.update(list => list.filter(d => d.id !== id))
        this.deleteConfirmId.set(null)
        return true
      }
      return false
    } finally {
      this.isLoading.set(false)
    }
  }

  openReviewDrawer(item: KycDocument): void {
    this.selected.set(item)
    this.drawerMode.set('review')
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
