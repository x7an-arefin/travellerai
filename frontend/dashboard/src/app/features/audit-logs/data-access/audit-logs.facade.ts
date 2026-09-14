import { Injectable, inject } from '@angular/core'
import { AuditLogsStore } from './store/audit-logs.store'
import { AuditLog } from './models/audit-logs.model'

@Injectable({
  providedIn: 'root',
})
export class AuditLogsFacade {
  private readonly store = inject(AuditLogsStore)

  readonly items = this.store.filteredItems
  readonly allItems = this.store.items
  readonly selected = this.store.selected
  readonly isLoading = this.store.isLoading
  readonly activeSeverityFilter = this.store.activeSeverityFilter
  readonly searchQuery = this.store.searchQuery
  readonly drawerMode = this.store.drawerMode
  readonly isDrawerOpen = () => this.store.drawerMode() !== 'closed'

  readonly criticalCount = this.store.criticalCount
  readonly warningCount = this.store.warningCount
  readonly infoCount = this.store.infoCount

  loadAll(): Promise<void> {
    return this.store.loadAll()
  }

  setSearchQuery(q: string): void {
    this.store.searchQuery.set(q)
  }

  setSeverityFilter(filter: string): void {
    this.store.activeSeverityFilter.set(filter)
  }

  openDetailDrawer(log: AuditLog): void {
    this.store.openDetailDrawer(log)
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }
}
