import { Injectable, inject } from '@angular/core'
import { DeparturesStore } from './store/departures.store'
import { CreateDepartureInput, UpdateDepartureInput } from './models/departures-api.types'
import { Departure } from './models/departures.model'

@Injectable({
  providedIn: 'root',
})
export class DeparturesFacade {
  private readonly store = inject(DeparturesStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.items
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly activeStatusFilter = this.store.activeStatusFilter
  readonly searchQuery = this.store.searchQuery
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId
  readonly isDrawerOpen = () => this.store.drawerMode() !== 'closed'

  readonly totalScheduledSeats = this.store.totalScheduledSeats
  readonly totalBookedSeats = this.store.totalBookedSeats
  readonly averageOccupancyRate = this.store.averageOccupancyRate

  loadAll(): Promise<void> {
    return this.store.loadAll()
  }

  setSearchQuery(q: string): void {
    this.store.searchQuery.set(q)
  }

  setStatusFilter(filter: string): void {
    this.store.activeStatusFilter.set(filter)
  }

  openAddDrawer(): void {
    this.store.openAddDrawer()
  }

  openEditDrawer(item: Departure): void {
    this.store.openEditDrawer(item)
  }

  openManifestModal(item: Departure): void {
    this.store.openManifestModal(item)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  create(dto: CreateDepartureInput): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdateDepartureInput): Promise<boolean> {
    return this.store.update(id, dto)
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
