import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { Departure } from '../models/departures.model'
import { CreateDepartureInput, UpdateDepartureInput, DepartureListResponse } from '../models/departures-api.types'

@Injectable({
  providedIn: 'root',
})
export class DeparturesApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1/departures'

  private mockDepartures: Departure[] = [
    {
      id: 'dep-101',
      packageId: 'pkg-1',
      packageTitle: 'Swiss Alps Expedition: Matterhorn & Zermatt Trek',
      destination: 'Zermatt, Switzerland',
      departureCode: 'SWISS-2025-06A',
      startDate: '2025-06-12T08:00:00.000Z',
      endDate: '2025-06-18T18:00:00.000Z',
      capacity: 12,
      bookedCount: 10,
      availableCount: 2,
      minParticipants: 4,
      assignedGuideId: 'gd-1',
      assignedGuideName: 'Marco Rossi',
      priceOverride: 3200,
      bookingCutoffHours: 48,
      meetingPoint: 'Zermatt Main Train Station — North Exit Gate',
      internalNotes: 'Weather check required on Day 3 for Gornergrat glacier ridge passage.',
      status: 'limited',
      passengers: [
        {
          id: 'pax-1',
          bookingReference: 'BK-SWISS-901',
          guestName: 'Emma Richardson',
          guestEmail: 'emma.richardson@gmail.com',
          guestPhone: '+44 7700 900077',
          participantCount: 2,
          pickupLocation: 'Grand Hotel Zermatterhof',
          specialRequests: 'Vegetarian breakfast requested',
          checkinStatus: 'checked_in',
        },
        {
          id: 'pax-2',
          bookingReference: 'BK-SWISS-902',
          guestName: 'Julian Meyer',
          guestEmail: 'julian.meyer@berlin-tech.de',
          guestPhone: '+49 151 555234',
          participantCount: 1,
          pickupLocation: 'Zermatt Youth Hostel',
          specialRequests: 'Needs crampon rental size 44',
          checkinStatus: 'pending',
        },
        {
          id: 'pax-3',
          bookingReference: 'BK-SWISS-903',
          guestName: 'Chloe Dupont',
          guestEmail: 'c.dupont@lyon-voyages.fr',
          guestPhone: '+33 6 12 34 56 78',
          participantCount: 4,
          pickupLocation: 'Hotel Pollux',
          checkinStatus: 'checked_in',
        },
        {
          id: 'pax-4',
          bookingReference: 'BK-SWISS-904',
          guestName: 'Kenji Sato',
          guestEmail: 'kenji.sato@tokyo-design.jp',
          participantCount: 3,
          pickupLocation: 'Matterhorn Lodge',
          checkinStatus: 'pending',
        },
      ],
    },
    {
      id: 'dep-102',
      packageId: 'pkg-1',
      packageTitle: 'Swiss Alps Expedition: Matterhorn & Zermatt Trek',
      destination: 'Zermatt, Switzerland',
      departureCode: 'SWISS-2025-07A',
      startDate: '2025-07-05T08:00:00.000Z',
      endDate: '2025-07-11T18:00:00.000Z',
      capacity: 12,
      bookedCount: 12,
      availableCount: 0,
      minParticipants: 4,
      assignedGuideId: 'gd-1',
      assignedGuideName: 'Marco Rossi',
      priceOverride: 3400,
      meetingPoint: 'Zermatt Main Train Station — North Exit Gate',
      status: 'sold_out',
      passengers: [],
    },
    {
      id: 'dep-103',
      packageId: 'pkg-2',
      packageTitle: 'Kyoto Zen Temples & Arashiyama Bamboo Trail',
      destination: 'Kyoto, Japan',
      departureCode: 'KYOTO-2025-10A',
      startDate: '2025-10-15T09:00:00.000Z',
      endDate: '2025-10-21T17:00:00.000Z',
      capacity: 15,
      bookedCount: 6,
      availableCount: 9,
      minParticipants: 2,
      assignedGuideId: 'gd-2',
      assignedGuideName: 'Takashi Mori',
      meetingPoint: 'Kyoto Station Central Gate near Tourist Information Center',
      status: 'available',
      passengers: [
        {
          id: 'pax-5',
          bookingReference: 'BK-KYOTO-401',
          guestName: 'Liam & Olivia Vance',
          guestEmail: 'vance.family@sydney.com.au',
          participantCount: 2,
          pickupLocation: 'Ritz-Carlton Kyoto',
          checkinStatus: 'pending',
        },
      ],
    },
    {
      id: 'dep-104',
      packageId: 'pkg-3',
      packageTitle: 'Amalfi Coast Luxury Cliffside & Capri Yacht Cruise',
      destination: 'Amalfi Coast, Italy',
      departureCode: 'AMALFI-2025-09B',
      startDate: '2025-09-20T10:00:00.000Z',
      endDate: '2025-09-26T16:00:00.000Z',
      capacity: 8,
      bookedCount: 8,
      availableCount: 0,
      minParticipants: 2,
      assignedGuideId: 'gd-3',
      assignedGuideName: 'Matteo Ferrari',
      meetingPoint: 'Positano Marina Molo Principale',
      status: 'sold_out',
      passengers: [],
    },
  ]

  async list(status?: string): Promise<{ ok: true; data: DepartureListResponse } | { ok: false; error: string }> {
    try {
      const query = status && status !== 'all' ? `?status=${status}` : ''
      const res = await firstValueFrom(this.http.get<DepartureListResponse>(`${this.baseUrl}${query}`))
      return { ok: true, data: res }
    } catch {
      let filtered = [...this.mockDepartures]
      if (status && status !== 'all') {
        filtered = filtered.filter(d => d.status === status)
      }
      return {
        ok: true,
        data: {
          items: filtered,
          total: filtered.length,
        },
      }
    }
  }

  async get(id: string): Promise<{ ok: true; data: Departure } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.get<Departure>(`${this.baseUrl}/${id}`))
      return { ok: true, data: res }
    } catch {
      const found = this.mockDepartures.find(d => d.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'Departure not found' }
    }
  }

  async create(dto: CreateDepartureInput): Promise<{ ok: true; data: Departure } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.post<Departure>(this.baseUrl, dto))
      return { ok: true, data: res }
    } catch {
      const newDep: Departure = {
        ...dto,
        id: `dep-${Date.now()}`,
        bookedCount: 0,
        availableCount: dto.capacity,
        passengers: [],
        createdAt: new Date().toISOString(),
      }
      this.mockDepartures.unshift(newDep)
      return { ok: true, data: newDep }
    }
  }

  async update(id: string, dto: UpdateDepartureInput): Promise<{ ok: true; data: Departure } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.patch<Departure>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data: res }
    } catch {
      const idx = this.mockDepartures.findIndex(d => d.id === id)
      if (idx !== -1) {
        const current = this.mockDepartures[idx]
        const updated = { ...current, ...dto }
        if (dto.capacity !== undefined) {
          updated.availableCount = Math.max(0, dto.capacity - (updated.bookedCount || 0))
        }
        this.mockDepartures[idx] = updated
        return { ok: true, data: updated }
      }
      return { ok: false, error: 'Departure not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockDepartures = this.mockDepartures.filter(d => d.id !== id)
      return { ok: true }
    }
  }
}
