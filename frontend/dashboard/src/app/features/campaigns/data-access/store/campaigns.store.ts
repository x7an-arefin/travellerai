import { Injectable, signal, computed, inject } from '@angular/core'
import { Coupon } from '../models/campaigns.model'
import { CampaignsApiService } from '../services/campaigns-api.service'
import { CreateCouponInput, UpdateCouponInput } from '../models/campaigns-api.types'

@Injectable({
  providedIn: 'root',
})
export class CampaignsStore {
  private readonly api = inject(CampaignsApiService)

  readonly items = signal<Coupon[]>([])
  readonly selected = signal<Coupon | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly activeStatusFilter = signal<string>('all')
  readonly searchQuery = signal<string>('')
  readonly drawerMode = signal<'closed' | 'add' | 'edit'>('closed')
  readonly deleteConfirmId = signal<string | null>(null)

  readonly filteredItems = computed(() => {
    const list = this.items()
    const query = this.searchQuery().toLowerCase().trim()
    const filter = this.activeStatusFilter()

    return list.filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter
      const matchesQuery =
        !query ||
        item.code.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.discountType.toLowerCase().includes(query)
      return matchesFilter && matchesQuery
    })
  })

  readonly totalRedemptions = computed(() => {
    return this.items().reduce((sum, c) => sum + c.usedCount, 0)
  })

  readonly activeCouponsCount = computed(() => {
    return this.items().filter(c => c.status === 'active').length
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

  async create(dto: CreateCouponInput): Promise<boolean> {
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

  async update(id: string, dto: UpdateCouponInput): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.update(id, dto)
      if (res.ok) {
        this.items.update(list => list.map(c => (c.id === id ? res.data : c)))
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

  async toggleStatus(id: string): Promise<boolean> {
    const item = this.items().find(c => c.id === id)
    if (!item) return false
    const nextStatus = item.status === 'active' ? 'inactive' : 'active'
    return this.update(id, { status: nextStatus })
  }

  async remove(id: string): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.remove(id)
      if (res.ok) {
        this.items.update(list => list.filter(c => c.id !== id))
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

  openEditDrawer(item: Coupon): void {
    this.selected.set(item)
    this.drawerMode.set('edit')
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
