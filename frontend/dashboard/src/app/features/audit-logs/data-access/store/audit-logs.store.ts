import { Injectable, signal, computed, inject } from '@angular/core'
import { AuditLog } from '../models/audit-logs.model'
import { AuditLogsApiService } from '../services/audit-logs-api.service'

@Injectable({
  providedIn: 'root',
})
export class AuditLogsStore {
  private readonly api = inject(AuditLogsApiService)

  readonly items = signal<AuditLog[]>([])
  readonly selected = signal<AuditLog | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly activeSeverityFilter = signal<string>('all')
  readonly searchQuery = signal<string>('')
  readonly drawerMode = signal<'closed' | 'detail'>('closed')

  readonly filteredItems = computed(() => {
    const list = this.items()
    const query = this.searchQuery().toLowerCase().trim()
    const filter = this.activeSeverityFilter()

    return list.filter(item => {
      const matchesFilter = filter === 'all' || item.severity === filter
      const matchesQuery =
        !query ||
        item.action.toLowerCase().includes(query) ||
        item.actorName.toLowerCase().includes(query) ||
        item.entityType.toLowerCase().includes(query) ||
        (item.ipAddress && item.ipAddress.includes(query)) ||
        (item.correlationId && item.correlationId.toLowerCase().includes(query))
      return matchesFilter && matchesQuery
    })
  })

  readonly criticalCount = computed(() => {
    return this.items().filter(l => l.severity === 'critical').length
  })

  readonly warningCount = computed(() => {
    return this.items().filter(l => l.severity === 'warning').length
  })

  readonly infoCount = computed(() => {
    return this.items().filter(l => l.severity === 'info').length
  })

  async loadAll(): Promise<void> {
    this.isLoading.set(true)
    try {
      const res = await this.api.list(this.activeSeverityFilter())
      if (res.ok) {
        this.items.set(res.data.items)
      }
    } finally {
      this.isLoading.set(false)
    }
  }

  openDetailDrawer(log: AuditLog): void {
    this.selected.set(log)
    this.drawerMode.set('detail')
  }

  closeDrawer(): void {
    this.drawerMode.set('closed')
    this.selected.set(null)
  }
}
