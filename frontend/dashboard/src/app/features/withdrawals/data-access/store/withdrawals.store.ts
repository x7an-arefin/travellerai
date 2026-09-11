import { Injectable, signal, computed, inject } from '@angular/core'
import { WithdrawalRequest } from '../models/withdrawals.model'
import { UpdateWithdrawalRequest } from '../models/withdrawals-api.types'
import { WithdrawalsApiService } from '../services/withdrawals-api.service'

export type DrawerMode = 'add' | 'edit' | 'detail' | null

@Injectable({ providedIn: 'root' })
export class WithdrawalsStore {
  private readonly api = inject(WithdrawalsApiService)

  readonly entities = signal<WithdrawalRequest[]>([])
  readonly selectedId = signal<string | null>(null)
  readonly drawerMode = signal<DrawerMode>(null)
  readonly isLoading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  readonly statusFilter = signal<string>('all')

  readonly hasError = computed(() => this.error() !== null)
  readonly errorMessage = computed(() => this.error())
  readonly isDrawerOpen = computed(() => this.drawerMode() !== null)
  readonly selected = computed(() => {
    const id = this.selectedId()
    return id ? this.entities().find(e => e.id === id) ?? null : null
  })

  readonly filteredItems = computed(() => {
    let items = this.entities()
    const status = this.statusFilter()
    if (status !== 'all') {
      items = items.filter(e => e.status === status)
    }
    return items
  })

  openDetailDrawer(id: string): void {
    this.selectedId.set(id)
    this.drawerMode.set('detail')
  }

  closeDrawer(): void {
    this.drawerMode.set(null)
    this.selectedId.set(null)
  }

  setStatusFilter(s: string): void {
    this.statusFilter.set(s)
  }

  async loadAll(): Promise<void> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.list()
    if (res.ok) {
      this.entities.set(res.data.items)
    } else {
      this.error.set(res.error)
    }
    this.isLoading.set(false)
  }

  async update(id: string, dto: UpdateWithdrawalRequest): Promise<boolean> {
    this.isLoading.set(true)
    const res = await this.api.update(id, dto)
    if (res.ok) {
      this.entities.update(prev => prev.map(e => (e.id === id ? res.data : e)))
      this.closeDrawer()
      this.isLoading.set(false)
      return true
    }
    this.isLoading.set(false)
    return false
  }
}
