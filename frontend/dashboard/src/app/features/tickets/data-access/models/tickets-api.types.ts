import { SupportTicket, TicketMessage } from './tickets.model'

export interface CreateSupportTicketApiInput {
  ticketNumber?: string
  subject: string
  description?: string
  priority: string
  category?: string
  userId?: string
  providerId?: string
  bookingId?: string
}

export interface CreateTicketMessageApiInput {
  ticketId: string
  senderId?: string
  senderType: 'traveler' | 'provider' | 'agent' | 'system'
  message: string
  isInternalNote?: boolean
}

export interface TicketListResponse {
  items: SupportTicket[]
  total: number
  hasMore?: boolean
  cursor?: string
}

export interface TicketApiResponse<T> {
  ok: boolean
  data?: T
  error?: string
}
