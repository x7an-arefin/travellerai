import { Injectable, inject } from '@angular/core'
import { PackagesStore } from './store/packages.store'
import { NewPackage, UpdatePackage } from './models/packages-api.types'

@Injectable({ providedIn: 'root' })
export class PackagesFacade {
  private readonly store = inject(PackagesStore)

  // State
  readonly items = this.store.filteredItems
  readonly allItems = this.store.entities
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly hasError = this.store.hasError
  readonly errorMessage = this.store.errorMessage

  // Drawer State
  readonly isDrawerOpen = this.store.isDrawerOpen
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId

  // Filters
  readonly searchQuery = this.store.searchQuery
  readonly activeStatusFilter = this.store.activeStatusFilter

  // Actions
  loadAll(): void {
    this.store.loadAll()
  }

  setSearchQuery(query: string): void {
    this.store.setSearchQuery(query)
  }

  setStatusFilter(status: string): void {
    this.store.setStatusFilter(status)
  }

  openAddDrawer(): void {
    this.store.openAddDrawer()
  }

  openEditDrawer(id: string): void {
    this.store.openEditDrawer(id)
  }

  openDetailDrawer(id: string): void {
    this.store.openDetailDrawer(id)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  requestDeleteConfirm(id: string): void {
    this.store.requestDeleteConfirm(id)
  }

  cancelDelete(): void {
    this.store.cancelDelete()
  }

  create(dto: NewPackage): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdatePackage): Promise<boolean> {
    return this.store.update(id, dto)
  }

  remove(id: string): Promise<boolean> {
    return this.store.remove(id)
  }
}
