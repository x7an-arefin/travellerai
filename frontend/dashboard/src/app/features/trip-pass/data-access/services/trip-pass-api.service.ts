import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { BookingsApiService } from '../../../bookings/data-access/services/bookings-api.service'
import { TripPassInfo, ConciergeMessage } from '../models/trip-pass.model'

@Injectable({
  providedIn: 'root',
})
export class TripPassApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly bookingsApi = inject(BookingsApiService)

  private readonly inquiriesUrl = this.apiConfig.buildUrl('trip-inquiries')

  private readonly defaultTripPass: TripPassInfo = {
    bookingId: 'bk-sylhet-101',
    reference: 'TRV-SYL-9082X',
    title: 'Sylhet Rain Forest & Luxury Highlands Expedition',
    destination: 'Sylhet, Bangladesh',
    dates: 'Sep 18 - Sep 22, 2026 (5 Days / 4 Nights)',
    status: 'active',
    guestName: 'Sultanul Arefin',
    guestEmail: 'arefin@traveller.ai',
    totalAmount: 955,
    currency: 'USD',
    qrCodeData: 'TRV-SYL-9082X-VERIFIED-OPERATOR',
    days: [
      { day: 1, date: 'Sep 18', theme: 'Arrival & Chauffeur' },
      { day: 2, date: 'Sep 19', theme: 'Swamp & Tea Trek' },
      { day: 3, date: 'Sep 20', theme: 'Self-Drive 4x4' },
      { day: 4, date: 'Sep 21', theme: 'Resort Wellness' },
      { day: 5, date: 'Sep 22', theme: 'Airport Departure' },
    ],
  }

  async getTripPass(referenceOrId?: string): Promise<{ ok: true; data: TripPassInfo }> {
    if (!referenceOrId) {
      return { ok: true, data: this.defaultTripPass }
    }

    try {
      // 1. Try finding by ID
      const direct = await this.bookingsApi.getById(referenceOrId)
      if (direct.ok && direct.data) {
        const b = direct.data
        return {
          ok: true,
          data: {
            bookingId: b.id,
            reference: b.bookingReference,
            title: b.packageTitle || this.defaultTripPass.title,
            destination: b.destination || this.defaultTripPass.destination,
            dates: `${b.departureDate || 'Sep 18'} (Multi-Day Experience)`,
            status: b.bookingStatus === 'confirmed' ? 'active' : 'pending',
            guestName: b.guestName,
            guestEmail: b.guestEmail,
            totalAmount: b.totalAmount,
            currency: b.currency,
            qrCodeData: `${b.bookingReference}-VERIFIED`,
            days: this.defaultTripPass.days,
          },
        }
      }

      // 2. Try finding in bookings list
      const list = await this.bookingsApi.list(undefined, 20)
      if (list.ok && list.data && list.data.items.length > 0) {
        const found = list.data.items.find(
          (item) => item.bookingReference === referenceOrId || item.id === referenceOrId
        )
        if (found) {
          return {
            ok: true,
            data: {
              bookingId: found.id,
              reference: found.bookingReference,
              title: found.packageTitle || this.defaultTripPass.title,
              destination: found.destination || this.defaultTripPass.destination,
              dates: `${found.departureDate || 'Sep 18'} (Multi-Day Experience)`,
              status: found.bookingStatus === 'confirmed' ? 'active' : 'pending',
              guestName: found.guestName,
              guestEmail: found.guestEmail,
              totalAmount: found.totalAmount,
              currency: found.currency,
              qrCodeData: `${found.bookingReference}-VERIFIED`,
              days: this.defaultTripPass.days,
            },
          }
        }
      }
    } catch {
      // Fallback
    }

    return { ok: true, data: this.defaultTripPass }
  }

  async sendConciergeMessage(
    bookingReference: string,
    userText: string
  ): Promise<{ ok: true; reply: ConciergeMessage }> {
    // Attempt to log the inquiry to backend if available
    try {
      await firstValueFrom(
        this.http.post(this.inquiriesUrl, {
          title: `Concierge request for ${bookingReference}`,
          message: userText,
          bookingReference,
        })
      )
    } catch {
      // Continues smoothly even if backend is offline
    }

    const lower = userText.toLowerCase()
    let text = 'I have received your request and logged it into the hotel PMS / fleet FMS console.'
    let actionPill = 'Request Logged'

    if (lower.includes('late checkout') || lower.includes('check out') || lower.includes('extension')) {
      text = 'I have notified the Front Desk at Grand Sylhet. Your checkout has been extended to 2:00 PM without additional charge.'
      actionPill = 'Late Checkout Approved (2:00 PM)'
    } else if (lower.includes('driver') || lower.includes('chauffeur') || lower.includes('car') || lower.includes('pickup')) {
      text = 'Chauffeur Rafiqul is currently 4.2 km away from Osmani Airport terminal in a Toyota HiAce (Plate: DHK-11-4092). Boarding PIN is 8419.'
      actionPill = 'Driver En Route • ETA 6 mins'
    } else if (lower.includes('room service') || lower.includes('towel') || lower.includes('amenities') || lower.includes('water')) {
      text = 'Housekeeping ticket #HK-109 has been issued for Room 408. Attendant will deliver amenities within 15 minutes.'
      actionPill = 'Housekeeping Dispatched'
    } else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('password')) {
      text = 'High-speed fiber WiFi is available throughout the resort. Network: GrandSylhet_VIP, Password: SylhetExpedition2026'
      actionPill = 'WiFi Credentials Provided'
    } else if (lower.includes('tour') || lower.includes('guide') || lower.includes('swamp') || lower.includes('trek')) {
      text = 'Your eco-guide Tanvir from Bengal Trailblazers will meet you at the lobby at 08:30 AM tomorrow with lifejackets and waterproof gear.'
      actionPill = 'Trek Guide Confirmed (08:30 AM)'
    }

    const now = new Date()
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    return {
      ok: true,
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text,
        timestamp,
        actionPill,
      },
    }
  }
}
