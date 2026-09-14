import { Injectable, inject } from '@angular/core'
import { CategoriesStore } from './store/categories.store'
import { NewCategory, UpdateCategory } from './models/categories-api.types'

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  private readonly store = inject(CategoriesStore)

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
  readonly statusFilter = this.store.activeStatusFilter

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

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  requestDeleteConfirm(id: string): void {
    this.store.requestDeleteConfirm(id)
  }

  cancelDelete(): void {
    this.store.cancelDelete()
  }

  create(dto: NewCategory): Promise<boolean> {
    return this.store.create(dto)
  }

  update(id: string, dto: UpdateCategory): Promise<boolean> {
    return this.store.update(id, dto)
  }

  remove(id: string): Promise<boolean> {
    return this.store.remove(id)
  }
}
