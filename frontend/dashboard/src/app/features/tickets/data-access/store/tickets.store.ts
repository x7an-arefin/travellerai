import { Injectable, signal, computed, inject } from '@angular/core'
import { SupportTicket, TicketStatus, NewTicketDto, TicketMessage } from '../models/tickets.model'
import { TicketsApiService } from '../services/tickets-api.service'
import { toast } from 'ngx-sonner'

@Injectable({
  providedIn: 'root',
})
export class TicketsStore {
  private readonly api = inject(TicketsApiService)

  readonly entities = signal<SupportTicket[]>([])
  readonly selectedId = signal<string | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  readonly searchQuery = signal<string>('')
  readonly activeStatusTab = signal<string>('all')
  readonly isInternalNote = signal<boolean>(false)
  readonly createDrawerOpen = signal<boolean>(false)

  readonly selectedTicket = computed(() => {
    const id = this.selectedId()
    return id ? this.entities().find((t) => t.id === id) ?? null : this.entities()[0] ?? null
  })

  readonly filteredTickets = computed(() => {
    let list = this.entities()
    const query = this.searchQuery().toLowerCase().trim()
    const tab = this.activeStatusTab()

    if (tab !== 'all') {
      list = list.filter((t) => t.status === tab)
    }

    if (query) {
      list = list.filter(
        (t) =>
          t.ticketNumber.toLowerCase().includes(query) ||
          t.subject.toLowerCase().includes(query) ||
          t.customer.name.toLowerCase().includes(query) ||
          t.customer.email.toLowerCase().includes(query) ||
          (t.bookingReference && t.bookingReference.toLowerCase().includes(query))
      )
    }

    return list
  })

  readonly openTicketsCount = computed(() => {
    return this.entities().filter((t) => t.status === 'open').length
  })

  readonly urgentCount = computed(() => {
    return this.entities().filter((t) => t.priority === 'urgent' && t.status !== 'resolved').length
  })

  async loadAll(): Promise<void> {
    this.isLoading.set(true)
    this.error.set(null)
    try {
      const res = await this.api.list()
      if (res.ok && res.data) {
        this.entities.set(res.data.items)
        if (!this.selectedId() && res.data.items.length > 0) {
          this.selectedId.set(res.data.items[0].id)
        }
      } else {
        this.error.set(res.error || 'Failed to load tickets')
      }
    } catch (err: any) {
      this.error.set(err?.message || 'Error fetching tickets')
    } finally {
      this.isLoading.set(false)
    }
  }

  selectTicket(id: string): void {
    this.selectedId.set(id)
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q)
  }

  setStatusTab(tab: string): void {
    this.activeStatusTab.set(tab)
  }

  toggleInternalNote(): void {
    this.isInternalNote.update((v) => !v)
  }

  openCreateDrawer(): void {
    this.createDrawerOpen.set(true)
  }

  closeCreateDrawer(): void {
    this.createDrawerOpen.set(false)
  }

  async createTicket(dto: NewTicketDto): Promise<boolean> {
    this.isLoading.set(true)
    try {
      const res = await this.api.create(dto)
      if (res.ok && res.data) {
        this.entities.update((list) => [res.data!, ...list])
        this.selectedId.set(res.data.id)
        this.closeCreateDrawer()
        toast.success(`Created ticket ${res.data.ticketNumber}`)
        return true
      } else {
        toast.error(res.error || 'Failed to create ticket')
        return false
      }
    } finally {
      this.isLoading.set(false)
    }
  }

  async sendReply(ticketId: string, message: string, senderName = 'Sarah Jenkins'): Promise<boolean> {
    if (!message.trim()) return false

    const isInternal = this.isInternalNote()
    const res = await this.api.sendReply({
      ticketId,
      message,
      isInternal,
      senderName,
      senderType: 'agent',
    })

    if (res.ok && res.data) {
      this.entities.update((list) =>
        list.map((t) => {
          if (t.id === ticketId) {
            const nextStatus: TicketStatus = t.status === 'open' && !isInternal ? 'in_progress' : t.status
            return {
              ...t,
              status: nextStatus,
              messages: [...t.messages, res.data!],
            }
          }
          return t
        })
      )
      toast.success(isInternal ? 'Internal note added.' : 'Reply sent to customer.')
      return true
    } else {
      toast.error(res.error || 'Failed to send reply')
      return false
    }
  }

  async markResolved(ticketId: string): Promise<void> {
    const res = await this.api.updateStatus(ticketId, 'resolved')
    if (res.ok) {
      this.entities.update((list) =>
        list.map((t) => (t.id === ticketId ? { ...t, status: 'resolved' as TicketStatus } : t))
      )
      toast.success('Ticket marked as resolved.')
    }
  }
}
