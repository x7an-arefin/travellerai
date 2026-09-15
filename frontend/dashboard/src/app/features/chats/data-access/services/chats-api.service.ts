import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { InquiriesApiService } from '../../../inquiries/data-access/services/inquiries-api.service'
import { Conversation, ChatMessage, SendMessageDto } from '../models/chats.model'

@Injectable({
  providedIn: 'root',
})
export class ChatsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly inquiriesApi = inject(InquiriesApiService)

  private readonly STORAGE_KEY = 'traveller_active_chats'

  private defaultConversations: Conversation[] = [
    {
      id: 'conv-1',
      profile: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      username: 'rafiqul_vip',
      fullName: 'Rafiqul Islam (VIP Chauffeur)',
      title: 'Airport Fleet Dispatch • Apex Fleet',
      status: 'online',
      unreadCount: 0,
      messages: [
        { sender: 'Rafiqul', message: 'Hello team! Vehicle Toyota HiAce (Plate: DHK-11-4092) is ready at terminal arrival gate.', timestamp: '10:15 AM' },
        { sender: 'You', message: 'Traveler landed on flight BG-601. Please confirm OTP 8419 upon boarding.', timestamp: '10:20 AM' },
        { sender: 'Rafiqul', message: 'Received and confirmed! Boarding completed smoothly. Proceeding to Grand Sylhet Resort.', timestamp: '10:25 AM' },
      ],
    },
    {
      id: 'conv-2',
      profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      username: 'tanvir_lead',
      fullName: 'Tanvir Ahmed',
      title: 'Lead Eco-Trek Guide • Bengal Trailblazers',
      status: 'online',
      unreadCount: 1,
      messages: [
        { sender: 'Tanvir', message: 'Good morning! Rain gear and swamp boat captains are ready for tomorrow morning.', timestamp: '09:10 AM' },
        { sender: 'You', message: 'Great! Traveler requested vegetarian meals during the trek.', timestamp: '09:15 AM' },
        { sender: 'Tanvir', message: 'Noted with the catering crew! We will have fresh artisan lunches packed.', timestamp: '09:18 AM' },
      ],
    },
    {
      id: 'conv-3',
      profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      username: 'elena_frontdesk',
      fullName: 'Elena Vance',
      title: 'Front Desk Lead • Matterhorn Panorama Suites',
      status: 'away',
      unreadCount: 0,
      messages: [
        { sender: 'Elena', message: 'VIP suite Matterhorn Panorama is prepared with welcome champagne.', timestamp: 'Yesterday' },
        { sender: 'You', message: 'Thank you Elena! Traveler checked in via our digital voucher pass.', timestamp: 'Yesterday' },
      ],
    },
    {
      id: 'conv-4',
      profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      username: 'marcus_ops',
      fullName: 'Marcus Vance',
      title: 'Safety & Compliance Officer',
      status: 'offline',
      unreadCount: 0,
      messages: [
        { sender: 'Marcus', message: 'All mountain guide certifications have been audited and verified in KYC hub.', timestamp: 'Aug 14' },
      ],
    },
  ]

  async listConversations(): Promise<{ ok: true; data: Conversation[] }> {
    // 1. Check local storage cache
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return { ok: true, data: JSON.parse(stored) }
      }
    } catch {
      // Fallback
    }

    // 2. Augment with inquiries from InquiriesApiService if available
    try {
      const inquiriesRes = await this.inquiriesApi.list()
      if (inquiriesRes.ok && inquiriesRes.data && inquiriesRes.data.items.length > 0) {
        const liveConvos: Conversation[] = inquiriesRes.data.items.map((inq, idx) => ({
          id: inq.id || `inq-${idx}`,
          profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(inq.contactName || 'Traveler')}`,
          username: (inq.contactName || 'traveler').toLowerCase().replace(/\s+/g, '_'),
          fullName: inq.contactName || 'Marketplace Inquirer',
          title: inq.destinationName ? `Custom Trip: ${inq.destinationName}` : 'Trip Inquiry',
          status: 'online' as const,
          unreadCount: inq.status === 'open' ? 1 : 0,
          messages: [
            {
              sender: inq.contactName || 'Traveler',
              message: inq.specialRequests || `Interested in travel to ${inq.destinationName} for ${inq.travelerCount} guests.`,
              timestamp: inq.createdAt ? inq.createdAt.split('T')[0] : 'Today',
            },
          ],
        }))

        const combined = [...liveConvos, ...this.defaultConversations]
        return { ok: true, data: combined }
      }
    } catch {
      // Offline fallback
    }

    return { ok: true, data: this.defaultConversations }
  }

  async sendMessage(dto: SendMessageDto): Promise<{ ok: true; data: ChatMessage }> {
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      message: dto.message,
      timestamp: timeStr,
      isMe: true,
    }

    return { ok: true, data: newMsg }
  }

  async createConversation(fullName: string, title: string, initialMessage: string): Promise<{ ok: true; data: Conversation }> {
    const newConvo: Conversation = {
      id: `conv-${Date.now()}`,
      profile: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
      username: fullName.toLowerCase().replace(/\s+/g, '_'),
      fullName,
      title,
      status: 'online',
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'You',
          message: initialMessage,
          timestamp: 'Just now',
          isMe: true,
        },
      ],
    }

    return { ok: true, data: newConvo }
  }
}
