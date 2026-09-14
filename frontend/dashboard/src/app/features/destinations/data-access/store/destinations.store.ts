import { Injectable, signal, computed, inject } from '@angular/core'
import { Destination } from '../models/destinations.model'
import { NewDestination, UpdateDestination } from '../models/destinations-api.types'
import { DestinationsApiService } from '../services/destinations-api.service'

export type DrawerMode = 'add' | 'edit' | 'detail' | null

@Injectable({ providedIn: 'root' })
export class DestinationsStore {
  private readonly api = inject(DestinationsApiService)

  readonly entities = signal<Destination[]>([])
  readonly selectedId = signal<string | null>(null)
  readonly drawerMode = signal<DrawerMode>(null)
  readonly deleteConfirmId = signal<string | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  readonly searchQuery = signal<string>('')
  readonly activeStatusFilter = signal<string>('all')

  readonly hasError = computed(() => this.error() !== null)
  readonly errorMessage = computed(() => this.error())
  readonly isDrawerOpen = computed(() => this.drawerMode() !== null)
  readonly selected = computed(() => {
    const id = this.selectedId()
    return id ? this.entities().find(e => e.id === id) ?? null : null
  })

  readonly filteredItems = computed(() => {
    let items = this.entities()
    const query = this.searchQuery().toLowerCase().trim()
    const status = this.activeStatusFilter()

    if (status !== 'all') {
      items = items.filter(e => e.status === status)
    }

    if (query) {
      items = items.filter(
        e =>
          e.name.toLowerCase().includes(query) ||
          e.country.toLowerCase().includes(query) ||
          (e.stateRegion && e.stateRegion.toLowerCase().includes(query))
      )
    }

    return items
  })

  openAddDrawer(): void {
    this.selectedId.set(null)
    this.drawerMode.set('add')
  }

  openEditDrawer(id: string): void {
    this.selectedId.set(id)
    this.drawerMode.set('edit')
  }

  openDetailDrawer(id: string): void {
    this.selectedId.set(id)
    this.drawerMode.set('detail')
  }

  closeDrawer(): void {
    this.drawerMode.set(null)
    this.selectedId.set(null)
  }

  requestDeleteConfirm(id: string): void {
    this.deleteConfirmId.set(id)
  }

  cancelDelete(): void {
    this.deleteConfirmId.set(null)
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q)
  }

  setStatusFilter(status: string): void {
    this.activeStatusFilter.set(status)
  }

  async loadAll(): Promise<void> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.list()
    this.isLoading.set(false)
    if (res.ok) {
      this.entities.set(res.data.items)
    } else {
      this.error.set(res.error)
    }
  }

  async create(dto: NewDestination): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.create(dto)
    this.isLoading.set(false)
    if (res.ok) {
      this.entities.update(prev => [res.data, ...prev])
      this.closeDrawer()
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }

  async update(id: string, dto: UpdateDestination): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.update(id, dto)
    this.isLoading.set(false)
    if (res.ok) {
      this.entities.update(prev => prev.map(item => (item.id === id ? res.data : item)))
      this.closeDrawer()
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }

  async remove(id: string): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.remove(id)
    this.isLoading.set(false)
    if (res.ok) {
      this.entities.update(prev => prev.filter(item => item.id !== id))
      this.cancelDelete()
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }
}
