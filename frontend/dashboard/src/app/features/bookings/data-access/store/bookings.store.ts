import { Injectable, signal, computed, inject } from '@angular/core'
import { Booking } from '../models/bookings.model'
import { NewBooking, UpdateBooking } from '../models/bookings-api.types'
import { BookingsApiService } from '../services/bookings-api.service'

export type DrawerMode = 'add' | 'edit' | 'detail' | null

@Injectable({ providedIn: 'root' })
export class BookingsStore {
  private readonly api = inject(BookingsApiService)

  readonly entities = signal<Booking[]>([])
  readonly selectedId = signal<string | null>(null)
  readonly drawerMode = signal<DrawerMode>(null)
  readonly deleteConfirmId = signal<string | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  readonly searchQuery = signal<string>('')
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
    const query = this.searchQuery().toLowerCase().trim()
    const status = this.statusFilter()

    if (status !== 'all') {
      items = items.filter(e => e.bookingStatus === status)
    }

    if (query) {
      items = items.filter(
        e =>
          e.bookingReference.toLowerCase().includes(query) ||
          e.guestName.toLowerCase().includes(query) ||
          e.guestEmail.toLowerCase().includes(query) ||
          (e.packageTitle && e.packageTitle.toLowerCase().includes(query))
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

  async create(dto: NewBooking): Promise<boolean> {
    this.isLoading.set(true)
    const res = await this.api.create(dto)
    if (res.ok) {
      this.entities.update(prev => [res.data, ...prev])
      this.closeDrawer()
      this.isLoading.set(false)
      return true
    }
    this.isLoading.set(false)
    return false
  }

  async update(id: string, dto: UpdateBooking): Promise<boolean> {
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

  async remove(id: string): Promise<boolean> {
    this.isLoading.set(true)
    const res = await this.api.remove(id)
    if (res.ok) {
      this.entities.update(prev => prev.filter(e => e.id !== id))
      this.deleteConfirmId.set(null)
      this.isLoading.set(false)
      return true
    }
    this.isLoading.set(false)
    return false
  }
}
