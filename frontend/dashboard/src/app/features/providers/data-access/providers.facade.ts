import { Injectable, inject } from '@angular/core'
import { ProvidersStore } from './store/providers.store'
import { NewProvider, UpdateProvider } from './models/providers-api.types'

@Injectable({ providedIn: 'root' })
export class ProvidersFacade {
  private readonly store = inject(ProvidersStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.entities
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly hasError = this.store.hasError
  readonly errorMessage = this.store.errorMessage

  readonly isDrawerOpen = this.store.isDrawerOpen
  readonly drawerMode = this.store.drawerMode
  readonly deleteConfirmId = this.store.deleteConfirmId

  readonly searchQuery = this.store.searchQuery
  readonly kycFilter = this.store.kycFilter

  loadAll(): void {
    this.store.loadAll()
  }

  setSearchQuery(query: string): void {
    this.store.setSearchQuery(query)
  }

  setKycFilter(status: string): void {
    this.store.setKycFilter(status)
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

  create(dto: NewProvider): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdateProvider): Promise<boolean> {
    return this.store.update(id, dto)
  }

  remove(id: string): Promise<boolean> {
    return this.store.remove(id)
  }
}
