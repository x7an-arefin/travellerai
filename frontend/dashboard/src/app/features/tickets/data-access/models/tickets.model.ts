export type TicketPriority = 'urgent' | 'high' | 'medium' | 'low'
export type TicketStatus = 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed'

export interface TicketCustomer {
  id?: string
  name: string
  email: string
  tier: string
  timezone: string
  avatar?: string
}

export interface TicketAssignee {
  id?: string
  name: string
  avatar?: string
}

export interface TicketMessage {
  id: string
  ticketId?: string
  sender: 'customer' | 'agent' | 'system'
  senderName: string
  senderId?: string
  time: string
  body: string
  isInternal?: boolean
  attachments?: string[]
  createdAt?: string
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  subject: string
  customer: TicketCustomer
  priority: TicketPriority
  status: TicketStatus
  slaRemainingMinutes: number
  assignee: TicketAssignee
  category?: string
  bookingId?: string
  bookingReference?: string
  createdAt: string
  updatedAt?: string
  messages: TicketMessage[]
}

export interface NewTicketDto {
  subject: string
  customerEmail: string
  customerName?: string
  priority: TicketPriority
  category?: string
  description: string
  assigneeName?: string
  bookingReference?: string
}

export interface ReplyMessageDto {
  ticketId: string
  message: string
  isInternal?: boolean
  senderName?: string
  senderType?: 'agent' | 'customer' | 'system'
}
