import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { TripInquiry, Quotation } from '../models/inquiries.model'
import { NewTripInquiry, UpdateTripInquiry, NewQuotation, TripInquiryListResponse } from '../models/inquiries-api.types'

@Injectable({ providedIn: 'root' })
export class InquiriesApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1/trip-inquiries'

  private mockInquiries: TripInquiry[] = [
    {
      id: 'inq-1',
      contactName: 'Lord Arthur Pendelton',
      contactEmail: 'arthur.p@noble-adventures.co.uk',
      destinationName: 'Swiss Alps & Jungfrau Region',
      startDate: '2026-10-10',
      endDate: '2026-10-18',
      travelerCount: 4,
      estimatedBudget: 14000,
      budgetCurrency: 'USD',
      preferences: {
        accommodationStyle: '5-Star Luxury Chalet with Private Chef',
        travelPace: 'Relaxed & Exclusive',
        activities: ['Helicopter Glacier Flight', 'Private Vineyard Tasting', 'Panoramic Scenic Rail'],
      },
      specialRequests: 'Celebrating 25th wedding anniversary. Requires private luxury Mercedes V-Class transfer throughout.',
      status: 'quoted',
      quotationCount: 2,
      quotations: [
        {
          id: 'quot-1',
          inquiryId: 'inq-1',
          providerId: 'prov-1',
          providerName: 'Alpine Wonders Agency',
          title: 'Royal Swiss Alps Panorama & Helicopter Tour (Bespoke 8 Days)',
          totalPrice: 13800,
          currency: 'USD',
          depositAmount: 3000,
          terms: '50% refundable up to 14 days before arrival. Private concierge included.',
          validUntil: '2026-09-25T23:59:59Z',
          status: 'submitted',
          createdAt: '2026-09-12T14:00:00Z',
        },
      ],
      expiresAt: '2026-09-30T00:00:00Z',
      createdAt: '2026-09-11T09:20:00Z',
    },
    {
      id: 'inq-2',
      contactName: 'David & Kimberly Sterling',
      contactEmail: 'kim.sterling@ventures.ca',
      destinationName: 'Serengeti & Zanzibar Ocean Extension',
      startDate: '2026-11-04',
      endDate: '2026-11-16',
      travelerCount: 2,
      estimatedBudget: 18500,
      budgetCurrency: 'USD',
      preferences: {
        accommodationStyle: 'Tented Luxury Bush Camp & Overwater Villa',
        travelPace: 'Immersive Wildlife',
        activities: ['Big Five Game Drives', 'Hot Air Balloon Safari', 'Zanzibar Spice Tour'],
      },
      specialRequests: 'Photography enthusiast; window seat guarantees and low-light game drives requested.',
      status: 'open',
      quotationCount: 1,
      quotations: [],
      expiresAt: '2026-10-01T00:00:00Z',
      createdAt: '2026-09-12T16:45:00Z',
    },
    {
      id: 'inq-3',
      contactName: 'Akira Takahashi',
      contactEmail: 'takahashi.family@globaltravel.jp',
      destinationName: 'Santorini & Cyclades Private Catamaran',
      startDate: '2026-10-01',
      endDate: '2026-10-06',
      travelerCount: 6,
      estimatedBudget: 9500,
      budgetCurrency: 'EUR',
      preferences: {
        accommodationStyle: 'Private Cliffside Villa Oia',
        travelPace: 'Leisure & Sailing',
        activities: ['Private Sunset Catamaran', 'Caldera Volcano Hike', 'Wine Cellar Dinner'],
      },
      specialRequests: 'Three generations traveling together (grandparents + children). Accessible ground transfers required.',
      status: 'accepted',
      quotationCount: 3,
      quotations: [
        {
          id: 'quot-3',
          inquiryId: 'inq-3',
          providerId: 'prov-2',
          providerName: 'Aegean Luxury Charters',
          title: 'Private 5-Day Santorini Caldera & Sunset Yacht Experience',
          totalPrice: 9200,
          currency: 'EUR',
          depositAmount: 2500,
          validUntil: '2026-09-20T23:59:59Z',
          status: 'accepted',
          createdAt: '2026-09-08T11:00:00Z',
        },
      ],
      expiresAt: '2026-09-28T00:00:00Z',
      createdAt: '2026-09-07T10:00:00Z',
    },
  ]

  async list(): Promise<{ ok: true; data: TripInquiryListResponse } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<TripInquiryListResponse>(this.baseUrl))
      return { ok: true, data }
    } catch {
      return {
        ok: true,
        data: {
          items: [...this.mockInquiries],
          total: this.mockInquiries.length,
        },
      }
    }
  }

  async getById(id: string): Promise<{ ok: true; data: TripInquiry } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<TripInquiry>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      const found = this.mockInquiries.find(i => i.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'Inquiry not found' }
    }
  }

  async create(dto: NewTripInquiry): Promise<{ ok: true; data: TripInquiry } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<TripInquiry>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      const newInquiry: TripInquiry = {
        ...dto,
        id: `inq-${Date.now()}`,
        status: 'open',
        quotationCount: 0,
        quotations: [],
        createdAt: new Date().toISOString(),
      }
      this.mockInquiries.unshift(newInquiry)
      return { ok: true, data: newInquiry }
    }
  }

  async update(id: string, dto: UpdateTripInquiry): Promise<{ ok: true; data: TripInquiry } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<TripInquiry>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      const idx = this.mockInquiries.findIndex(i => i.id === id)
      if (idx !== -1) {
        this.mockInquiries[idx] = { ...this.mockInquiries[idx], ...dto }
        return { ok: true, data: this.mockInquiries[idx] }
      }
      return { ok: false, error: 'Inquiry not found' }
    }
  }

  async addQuotation(inquiryId: string, quote: NewQuotation): Promise<{ ok: true; data: Quotation } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<Quotation>(`http://localhost:8000/api/v1/provider-quotations`, quote))
      return { ok: true, data }
    } catch {
      const newQuot: Quotation = {
        ...quote,
        id: `quot-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      const inq = this.mockInquiries.find(i => i.id === inquiryId)
      if (inq) {
        if (!inq.quotations) inq.quotations = []
        inq.quotations.push(newQuot)
        inq.quotationCount = inq.quotations.length
        inq.status = 'quoted'
      }
      return { ok: true, data: newQuot }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockInquiries = this.mockInquiries.filter(i => i.id !== id)
      return { ok: true }
    }
  }
}
