import { Injectable, inject } from '@angular/core'
import { TicketsStore } from './store/tickets.store'
import { NewTicketDto } from './models/tickets.model'

@Injectable({
  providedIn: 'root',
})
export class TicketsFacade {
  private readonly store = inject(TicketsStore)

  readonly items = this.store.filteredTickets
  readonly allTickets = this.store.entities
  readonly selectedTicket = this.store.selectedTicket
  readonly isLoading = this.store.isLoading
  readonly error = this.store.error
  readonly searchQuery = this.store.searchQuery
  readonly activeStatusTab = this.store.activeStatusTab
  readonly isInternalNote = this.store.isInternalNote
  readonly createDrawerOpen = this.store.createDrawerOpen
  readonly openTicketsCount = this.store.openTicketsCount
  readonly urgentCount = this.store.urgentCount

  loadAll(): void {
    this.store.loadAll()
  }

  selectTicket(id: string): void {
    this.store.selectTicket(id)
  }

  setSearchQuery(query: string): void {
    this.store.setSearchQuery(query)
  }

  setStatusTab(tab: string): void {
    this.store.setStatusTab(tab)
  }

  toggleInternalNote(): void {
    this.store.toggleInternalNote()
  }

  openCreateDrawer(): void {
    this.store.openCreateDrawer()
  }

  closeCreateDrawer(): void {
    this.store.closeCreateDrawer()
  }

  createTicket(dto: NewTicketDto): Promise<boolean> {
    return this.store.createTicket(dto)
  }

  sendReply(ticketId: string, message: string): Promise<boolean> {
    return this.store.sendReply(ticketId, message)
  }

  markResolved(ticketId: string): Promise<void> {
    return this.store.markResolved(ticketId)
  }
}
