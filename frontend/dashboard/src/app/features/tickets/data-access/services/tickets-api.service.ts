import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { SupportTicket, TicketMessage, NewTicketDto, ReplyMessageDto, TicketStatus } from '../models/tickets.model'
import { CreateSupportTicketApiInput, CreateTicketMessageApiInput, TicketListResponse, TicketApiResponse } from '../models/tickets-api.types'

@Injectable({
  providedIn: 'root',
})
export class TicketsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('support-tickets')
  private readonly messagesUrl = this.apiConfig.buildUrl('ticket-messages')

  // Demonstration seed state with offline resilience
  private mockTickets: SupportTicket[] = [
    {
      id: 'tck-1',
      ticketNumber: '#TCK-9821',
      subject: 'Glacier Express Seat Upgrade & Special Dietary Request',
      customer: {
        name: 'Emma Richardson',
        email: 'emma.richardson@gmail.com',
        tier: 'Platinum Voyager',
        timezone: 'GMT+1 (Zurich)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      },
      priority: 'urgent',
      status: 'open',
      slaRemainingMinutes: 24,
      assignee: {
        name: 'Marco Rossi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      },
      category: 'Reservations & Booking',
      bookingReference: 'TRV-88291',
      createdAt: '12 mins ago',
      messages: [
        {
          id: 'm-1',
          sender: 'customer',
          senderName: 'Emma Richardson',
          time: '14:22',
          body: 'Hello Support team, we are arriving in Interlaken tomorrow. Could you please confirm if our panoramic coach seats were upgraded to Excellence Class? Also, my companion requires a strict gluten-free meal during the alpine fondue banquet.',
        },
        {
          id: 'm-2',
          sender: 'agent',
          senderName: 'Marco Rossi',
          time: '14:29',
          body: 'Hi Emma! I have contacted the Swiss Rail dispatcher directly. Excellence Class upgrades have been locked in for coach #4. I am currently confirming the dietary menu with Hotel Victoria culinary staff.',
          isInternal: false,
        },
        {
          id: 'm-3',
          sender: 'agent',
          senderName: 'Sarah Jenkins',
          time: '14:31',
          body: 'Dispatch confirmed: Chef Pierre at Interlaken Chalet has verified the allergen-free kit. Ready for final customer notice.',
          isInternal: true,
        },
      ],
    },
    {
      id: 'tck-2',
      ticketNumber: '#TCK-9819',
      subject: 'Flight BG-601 Delayed • Reschedule Chauffeur Transfer',
      customer: {
        name: 'Liam Chen',
        email: 'liam.chen@techcorp.io',
        tier: 'Enterprise VIP',
        timezone: 'GMT+6 (Dhaka)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      },
      priority: 'high',
      status: 'in_progress',
      slaRemainingMinutes: 48,
      assignee: {
        name: 'Rafiqul Islam',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      },
      category: 'Fleet & Ground Transport',
      bookingReference: 'TRV-88292',
      createdAt: '34 mins ago',
      messages: [
        {
          id: 'm-201',
          sender: 'customer',
          senderName: 'Liam Chen',
          time: '13:58',
          body: 'Flight BG-601 has been held on the tarmac for 45 minutes due to dense fog. Can you reschedule the airport chauffeur to meet me at Terminal 1 at 16:30 instead of 15:45?',
        },
        {
          id: 'm-202',
          sender: 'agent',
          senderName: 'Rafiqul Islam',
          time: '14:05',
          body: 'Noted Mr. Chen. Your chauffeur Rafiqul has adjusted parking entry to 16:15. Your boarding PIN remains 8419.',
        },
      ],
    },
    {
      id: 'tck-3',
      ticketNumber: '#TCK-9815',
      subject: 'VAT Invoice Breakdown & Corporate Expense Receipt',
      customer: {
        name: 'Sofia Martinez',
        email: 'sofia.martinez@traveler.eu',
        tier: 'Standard Member',
        timezone: 'GMT+2 (Madrid)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      },
      priority: 'medium',
      status: 'waiting',
      slaRemainingMinutes: 110,
      assignee: {
        name: 'Finance Desk',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      },
      category: 'Billing & Invoices',
      bookingReference: 'TRV-88293',
      createdAt: '1 hour ago',
      messages: [
        {
          id: 'm-301',
          sender: 'customer',
          senderName: 'Sofia Martinez',
          time: '13:15',
          body: 'Please generate an official tax breakdown invoice for booking TRV-88293 with company Tax ID ES-B88291039 included.',
        },
      ],
    },
    {
      id: 'tck-4',
      ticketNumber: '#TCK-9799',
      subject: 'Late Checkout Verification & Baggage Storage at Ubud Resort',
      customer: {
        name: 'David Kim',
        email: 'david.kim@gmail.com',
        tier: 'Gold Voyager',
        timezone: 'GMT+8 (Bali)',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      },
      priority: 'low',
      status: 'resolved',
      slaRemainingMinutes: 0,
      assignee: {
        name: 'Ketut Suardana',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      },
      category: 'Hospitality & Hotels',
      createdAt: '3 hours ago',
      messages: [
        {
          id: 'm-401',
          sender: 'customer',
          senderName: 'David Kim',
          time: '11:00',
          body: 'We have an evening flight from Denpasar. Can we leave our bags with the front desk after 2:00 PM?',
        },
        {
          id: 'm-402',
          sender: 'agent',
          senderName: 'Ketut Suardana',
          time: '11:18',
          body: 'Complimentary luggage storage and resort pool access have been granted until 19:00. Safe travels!',
        },
      ],
    },
  ]

  async list(status?: string, cursor?: string, limit = 50): Promise<TicketApiResponse<TicketListResponse>> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (status && status !== 'all') params = params.set('status', status)
      if (cursor) params = params.set('cursor', cursor)

      const res = await firstValueFrom(this.http.get<any>(this.baseUrl, { params }))
      // Support array or paginated response format
      const items = Array.isArray(res) ? res : res.data || res.items || this.mockTickets
      return { ok: true, data: { items, total: items.length } }
    } catch {
      let filtered = this.mockTickets
      if (status && status !== 'all') {
        filtered = filtered.filter((t) => t.status === status)
      }
      return { ok: true, data: { items: filtered, total: filtered.length } }
    }
  }

  async getById(id: string): Promise<TicketApiResponse<SupportTicket>> {
    try {
      const data = await firstValueFrom(this.http.get<SupportTicket>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      const found = this.mockTickets.find((t) => t.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'Ticket not found' }
    }
  }

  async create(dto: NewTicketDto): Promise<TicketApiResponse<SupportTicket>> {
    try {
      const payload: CreateSupportTicketApiInput = {
        subject: dto.subject,
        description: dto.description,
        priority: dto.priority,
        category: dto.category || 'General Support',
      }
      const data = await firstValueFrom(this.http.post<SupportTicket>(this.baseUrl, payload))
      return { ok: true, data }
    } catch {
      const newTicket: SupportTicket = {
        id: `tck-${Date.now()}`,
        ticketNumber: `#TCK-98${Math.floor(20 + Math.random() * 80)}`,
        subject: dto.subject,
        customer: {
          name: dto.customerName || dto.customerEmail.split('@')[0],
          email: dto.customerEmail,
          tier: 'Traveler Client',
          timezone: 'UTC',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        },
        priority: dto.priority,
        status: 'open',
        slaRemainingMinutes: 60,
        assignee: {
          name: dto.assigneeName || 'Support SLA Desk',
          avatar: '',
        },
        category: dto.category || 'Reservations & Booking',
        bookingReference: dto.bookingReference,
        createdAt: 'Just now',
        messages: [
          {
            id: `m-${Date.now()}`,
            sender: 'customer',
            senderName: dto.customerName || dto.customerEmail.split('@')[0],
            time: 'Just now',
            body: dto.description || 'No initial message provided.',
          },
        ],
      }
      this.mockTickets.unshift(newTicket)
      return { ok: true, data: newTicket }
    }
  }

  async sendReply(dto: ReplyMessageDto): Promise<TicketApiResponse<TicketMessage>> {
    try {
      const payload: CreateTicketMessageApiInput = {
        ticketId: dto.ticketId,
        senderType: (dto.senderType as any) || 'agent',
        message: dto.message,
        isInternalNote: dto.isInternal,
      }
      const data = await firstValueFrom(this.http.post<TicketMessage>(this.messagesUrl, payload))
      return { ok: true, data }
    } catch {
      const newMsg: TicketMessage = {
        id: `m-${Date.now()}`,
        ticketId: dto.ticketId,
        sender: dto.senderType || 'agent',
        senderName: dto.senderName || 'Sarah Jenkins',
        time: 'Just now',
        body: dto.message,
        isInternal: dto.isInternal ?? false,
        createdAt: new Date().toISOString(),
      }
      const ticket = this.mockTickets.find((t) => t.id === dto.ticketId)
      if (ticket) {
        ticket.messages.push(newMsg)
        if (ticket.status === 'open' && !dto.isInternal) {
          ticket.status = 'in_progress'
        }
      }
      return { ok: true, data: newMsg }
    }
  }

  async updateStatus(ticketId: string, status: TicketStatus): Promise<TicketApiResponse<SupportTicket>> {
    try {
      const data = await firstValueFrom(
        this.http.patch<SupportTicket>(`${this.baseUrl}/${ticketId}`, { status })
      )
      return { ok: true, data }
    } catch {
      const ticket = this.mockTickets.find((t) => t.id === ticketId)
      if (ticket) {
        ticket.status = status
        return { ok: true, data: ticket }
      }
      return { ok: false, error: 'Ticket not found' }
    }
  }
}
