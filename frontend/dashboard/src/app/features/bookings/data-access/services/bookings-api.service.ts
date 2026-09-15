import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { Booking } from '../models/bookings.model'
import { NewBooking, UpdateBooking, BookingListResponse } from '../models/bookings-api.types'

@Injectable({ providedIn: 'root' })
export class BookingsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('bookings')

  private mockBookings: Booking[] = [
    {
      id: 'bk-1',
      bookingReference: 'TRV-88291',
      serviceType: 'bundle',
      packageId: 'pkg-1',
      packageTitle: 'Swiss Alps Grand Panorama Express & Glacier Hike',
      destination: 'Switzerland',
      departureDate: '2026-09-18',
      guestName: 'Emma Richardson',
      guestEmail: 'emma.richardson@gmail.com',
      guestPhone: '+44 7911 123456',
      participantCount: 2,
      bookingStatus: 'confirmed',
      totalAmount: 2900,
      paidAmount: 2900,
      currency: 'USD',
      pickupLocation: 'Zurich Airport Terminal 1, Arrival Gate B',
      specialRequests: 'Window seats requested on panoramic rail. Vegetarian meal for 1 guest.',
      checkinStatus: 'checked_in',
      checkinTime: '2026-09-11T09:30:00Z',
      voucherUrl: 'https://traveller.ai/vouchers/TRV-88291.pdf',
      confirmedAt: '2026-08-20T14:22:00Z',
      createdAt: '2026-08-20T14:15:00Z',
      serviceDetails: {
        hotelName: 'The Omnia Mountain Lodge',
        roomType: 'Matterhorn Panorama Suite',
        nights: 4,
        bundleItemCount: 3,
      },
    },
    {
      id: 'bk-2',
      bookingReference: 'TRV-88292',
      serviceType: 'hotel',
      packageTitle: 'Amalfi Cliffside Villa & Infinity Suites',
      destination: 'Positano, Italy',
      departureDate: '2026-09-24',
      guestName: 'Liam Chen',
      guestEmail: 'liam.chen@techcorp.io',
      guestPhone: '+1 415 892 0123',
      participantCount: 2,
      bookingStatus: 'confirmed',
      totalAmount: 3840,
      paidAmount: 3840,
      currency: 'USD',
      pickupLocation: 'Naples Airport Chauffeur Desk',
      specialRequests: 'High-floor suite requested with direct ocean sunset balcony.',
      checkinStatus: 'pending',
      voucherUrl: 'https://traveller.ai/vouchers/TRV-88292.pdf',
      confirmedAt: '2026-08-15T10:00:00Z',
      createdAt: '2026-08-15T09:45:00Z',
      serviceDetails: {
        hotelName: 'Le Sirenuse Luxury Suites',
        roomType: 'Deluxe Sea View Balcony',
        nights: 4,
      },
    },
    {
      id: 'bk-vh-1',
      bookingReference: 'TRV-88298',
      serviceType: 'vehicle',
      packageTitle: 'VIP Chauffeur Airport Transfer',
      destination: 'Tokyo Narita -> Ginza Central',
      departureDate: '2026-09-22',
      guestName: 'Hiroshi Tanaka',
      guestEmail: 'hiroshi.t@globalfin.jp',
      guestPhone: '+81 90 1234 5678',
      participantCount: 2,
      bookingStatus: 'confirmed',
      totalAmount: 195,
      paidAmount: 195,
      currency: 'USD',
      pickupLocation: 'Tokyo Narita Airport Terminal 2 (Flight JL004)',
      specialRequests: 'English-speaking chauffeur, bottled Fiji water, and luggage assistance.',
      checkinStatus: 'pending',
      voucherUrl: 'https://traveller.ai/vouchers/TRV-88298.pdf',
      confirmedAt: '2026-09-10T12:00:00Z',
      createdAt: '2026-09-10T11:45:00Z',
      serviceDetails: {
        vehicleModel: 'Mercedes-Benz S-Class 580e',
        vehicleCategory: 'Executive VIP Sedan',
        flightNumber: 'JL004',
      },
    },
    {
      id: 'bk-3',
      bookingReference: 'TRV-88293',
      packageId: 'pkg-2',
      packageTitle: 'Ubud Sacred Valley, Waterfall & Cultural Immersion',
      destination: 'Bali, Indonesia',
      departureDate: '2026-09-15',
      guestName: 'Sofia Martinez',
      guestEmail: 'sofia.martinez@traveler.eu',
      guestPhone: '+34 612 345 678',
      participantCount: 2,
      bookingStatus: 'confirmed',
      totalAmount: 840,
      paidAmount: 840,
      currency: 'USD',
      pickupLocation: 'Maya Ubud Resort & Spa Lobby',
      specialRequests: 'Allergy alert: Peanut allergy for one traveler.',
      checkinStatus: 'checked_in',
      checkinTime: '2026-09-11T08:15:00Z',
      voucherUrl: 'https://traveller.ai/vouchers/TRV-88293.pdf',
      confirmedAt: '2026-09-01T16:30:00Z',
      createdAt: '2026-09-01T16:20:00Z',
    },
    {
      id: 'bk-4',
      bookingReference: 'TRV-88294',
      packageId: 'pkg-4',
      packageTitle: 'Kyoto Ancient Temples, Tea Rituals & Bamboo Grove',
      destination: 'Kyoto, Japan',
      departureDate: '2026-10-02',
      guestName: 'Marcus Vance',
      guestEmail: 'marcus.v@adventure.com',
      guestPhone: '+1 206 555 7890',
      participantCount: 1,
      bookingStatus: 'pending_payment',
      totalAmount: 890,
      paidAmount: 0,
      balanceDue: 890,
      currency: 'USD',
      pickupLocation: 'Kyoto Station North Exit Concierge Desk',
      specialRequests: 'Solo traveler. Prefers early morning departure.',
      checkinStatus: 'pending',
      confirmedAt: undefined,
      createdAt: '2026-09-10T18:10:00Z',
    },
    {
      id: 'bk-5',
      bookingReference: 'TRV-88295',
      packageId: 'pkg-5',
      packageTitle: 'Santorini Sunset Sailing, Caldera Catamaran & Wine Tasting',
      destination: 'Santorini, Greece',
      departureDate: '2026-09-12',
      guestName: 'Elena Rostova',
      guestEmail: 'elena.rostova@globetrotter.org',
      guestPhone: '+49 170 9876543',
      participantCount: 2,
      bookingStatus: 'completed',
      totalAmount: 390,
      paidAmount: 390,
      currency: 'USD',
      pickupLocation: 'Fira Central Bus Square',
      specialRequests: 'None',
      checkinStatus: 'checked_in',
      checkinTime: '2026-09-12T14:00:00Z',
      voucherUrl: 'https://traveller.ai/vouchers/TRV-88295.pdf',
      confirmedAt: '2026-08-28T11:00:00Z',
      createdAt: '2026-08-28T10:45:00Z',
    },
    {
      id: 'bk-6',
      bookingReference: 'TRV-88296',
      packageId: 'pkg-6',
      packageTitle: 'Cappadocia Hot Air Balloon & Fairy Chimneys Discovery',
      destination: 'Cappadocia, Turkey',
      departureDate: '2026-09-28',
      guestName: 'David & Sarah Miller',
      guestEmail: 'miller.family@sydney.com.au',
      guestPhone: '+61 412 345 678',
      participantCount: 2,
      bookingStatus: 'confirmed',
      totalAmount: 1120,
      paidAmount: 1120,
      currency: 'USD',
      pickupLocation: 'Sultan Cave Suites Goreme',
      specialRequests: 'Anniversary cake upon arrival at cave suite.',
      checkinStatus: 'pending',
      voucherUrl: 'https://traveller.ai/vouchers/TRV-88296.pdf',
      confirmedAt: '2026-09-05T07:15:00Z',
      createdAt: '2026-09-05T07:00:00Z',
    },
  ]

  async list(cursor?: string, limit = 20): Promise<{ ok: true; data: BookingListResponse } | { ok: false; error: string }> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (cursor) params = params.set('cursor', cursor)
      const data = await firstValueFrom(this.http.get<BookingListResponse>(this.baseUrl, { params }))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        return {
          ok: true,
          data: {
            items: [...this.mockBookings],
            total: this.mockBookings.length,
            hasMore: false,
          },
        }
      }
      return { ok: false, error: 'Could not connect to Bookings service.' }
    }
  }

  async getById(id: string): Promise<{ ok: true; data: Booking } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<Booking>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        const found = this.mockBookings.find(b => b.id === id)
        if (found) return { ok: true, data: found }
      }
      return { ok: false, error: 'Booking not found' }
    }
  }

  async create(dto: NewBooking): Promise<{ ok: true; data: Booking } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<Booking>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        const newBooking: Booking = {
          ...dto,
          id: `bk-${Date.now()}`,
          bookingReference: `TRV-${Math.floor(10000 + Math.random() * 90000)}`,
          createdAt: new Date().toISOString(),
        }
        this.mockBookings.unshift(newBooking)
        return { ok: true, data: newBooking }
      }
      return { ok: false, error: 'Failed to create booking on server.' }
    }
  }

  async update(id: string, dto: UpdateBooking): Promise<{ ok: true; data: Booking } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<Booking>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      if (!this.apiConfig.isProduction) {
        const idx = this.mockBookings.findIndex(b => b.id === id)
        if (idx !== -1) {
          this.mockBookings[idx] = { ...this.mockBookings[idx], ...dto }
          return { ok: true, data: this.mockBookings[idx] }
        }
      }
      return { ok: false, error: 'Booking not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      if (!this.apiConfig.isProduction) {
        this.mockBookings = this.mockBookings.filter(b => b.id !== id)
        return { ok: true }
      }
      return { ok: false, error: 'Failed to cancel booking.' }
    }
  }
}
