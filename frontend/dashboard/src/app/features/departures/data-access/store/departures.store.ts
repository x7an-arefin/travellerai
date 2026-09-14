import { Injectable, signal, computed, inject } from '@angular/core'
import { Departure } from '../models/departures.model'
import { DeparturesApiService } from '../services/departures-api.service'
import { CreateDepartureInput, UpdateDepartureInput } from '../models/departures-api.types'

@Injectable({
  providedIn: 'root',
})
export class DeparturesStore {
  private readonly api = inject(DeparturesApiService)

  readonly items = signal<Departure[]>([])
  readonly selected = signal<Departure | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly activeStatusFilter = signal<string>('all')
  readonly searchQuery = signal<string>('')
  readonly drawerMode = signal<'closed' | 'add' | 'edit' | 'manifest'>('closed')
  readonly deleteConfirmId = signal<string | null>(null)

  readonly filteredItems = computed(() => {
    const list = this.items()
    const query = this.searchQuery().toLowerCase().trim()
    const filter = this.activeStatusFilter()

    return list.filter(item => {
      const matchesFilter = filter === 'all' || item.status === filter
      const matchesQuery =
        !query ||
        item.departureCode.toLowerCase().includes(query) ||
        (item.packageTitle && item.packageTitle.toLowerCase().includes(query)) ||
        (item.destination && item.destination.toLowerCase().includes(query)) ||
        (item.assignedGuideName && item.assignedGuideName.toLowerCase().includes(query))
      return matchesFilter && matchesQuery
    })
  })

  readonly totalScheduledSeats = computed(() => {
    return this.items().reduce((sum, d) => sum + d.capacity, 0)
  })

  readonly totalBookedSeats = computed(() => {
    return this.items().reduce((sum, d) => sum + d.bookedCount, 0)
  })

  readonly averageOccupancyRate = computed(() => {
    const total = this.totalScheduledSeats()
    if (!total) return 0
    return Math.round((this.totalBookedSeats() / total) * 100)
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

  async create(dto: CreateDepartureInput): Promise<boolean> {
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

  async update(id: string, dto: UpdateDepartureInput): Promise<boolean> {
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

  openEditDrawer(item: Departure): void {
    this.selected.set(item)
    this.drawerMode.set('edit')
  }

  openManifestModal(item: Departure): void {
    this.selected.set(item)
    this.drawerMode.set('manifest')
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
