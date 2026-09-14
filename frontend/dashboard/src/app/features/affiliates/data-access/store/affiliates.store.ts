import { Injectable, signal, computed, inject } from '@angular/core'
import { AffiliateAccount } from '../models/affiliates.model'
import { AffiliatesApiService } from '../services/affiliates-api.service'
import { CreateAffiliateInput, UpdateAffiliateInput } from '../models/affiliates-api.types'

@Injectable({
  providedIn: 'root',
})
export class AffiliatesStore {
  private readonly api = inject(AffiliatesApiService)

  readonly items = signal<AffiliateAccount[]>([])
  readonly selected = signal<AffiliateAccount | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly activeStatusFilter = signal<string>('all')
  readonly searchQuery = signal<string>('')
  readonly drawerMode = signal<'closed' | 'add' | 'detail' | 'rate'>('closed')
  readonly deleteConfirmId = signal<string | null>(null)

  readonly filteredItems = computed(() => {
    const list = this.items()
    const query = this.searchQuery().toLowerCase().trim()
    const filter = this.activeStatusFilter()

    return list.filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter
      const matchesQuery =
        !query ||
        item.partnerName.toLowerCase().includes(query) ||
        item.referralCode.toLowerCase().includes(query) ||
        item.partnerEmail.toLowerCase().includes(query)
      return matchesFilter && matchesQuery
    })
  })

  readonly totalCommissionSummary = computed(() => {
    return this.items().reduce((sum, item) => sum + item.totalCommissionEarned, 0)
  })

  readonly pendingPayoutsSummary = computed(() => {
    return this.items().reduce((sum, item) => sum + item.pendingPayout, 0)
  })

  readonly totalBookingsAttributed = computed(() => {
    return this.items().reduce((sum, item) => sum + item.totalBookings, 0)
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

  async create(dto: CreateAffiliateInput): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.create(dto)
      if (res.ok) {
        this.items.update(list => [res.data, ...list])
        this.closeDrawer()
        return true
      }
      return false
    } finally {
      this.isLoading.set(false)
    }
  }

  async update(id: string, dto: UpdateAffiliateInput): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.update(id, dto)
      if (res.ok) {
        this.items.update(list => list.map(item => (item.id === id ? res.data : item)))
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

  async updateStatus(id: string, status: 'pending' | 'active' | 'suspended' | 'rejected'): Promise<boolean> {
    return this.update(id, { status })
  }

  async updateCommissionRate(id: string, commissionRate: number): Promise<boolean> {
    return this.update(id, { commissionRate })
  }

  async remove(id: string): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.remove(id)
      if (res.ok) {
        this.items.update(list => list.filter(item => item.id !== id))
        this.deleteConfirmId.set(null)
        return true
      }
      return false
    } finally {
      this.isLoading.set(false)
    }
  }

  openAddDrawer(): void {
    this.selected.set(null)
    this.drawerMode.set('add')
  }

  openDetailDrawer(item: AffiliateAccount): void {
    this.selected.set(item)
    this.drawerMode.set('detail')
  }

  openRateDrawer(item: AffiliateAccount): void {
    this.selected.set(item)
    this.drawerMode.set('rate')
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
