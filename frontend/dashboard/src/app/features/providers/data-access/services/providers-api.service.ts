import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { Provider } from '../models/providers.model'
import { NewProvider, UpdateProvider, ProviderListResponse } from '../models/providers-api.types'

@Injectable({ providedIn: 'root' })
export class ProvidersApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1/providers'

  private mockProviders: Provider[] = [
    {
      id: 'prov-1',
      legalName: 'Alpine Wonders AG',
      displayName: 'Alpine Wonders Agency',
      slug: 'alpine-wonders',
      providerType: 'tour_operator',
      registrationNumber: 'CHE-112.345.678',
      taxId: 'CH998877',
      country: 'Switzerland',
      address: 'Bahnhofstrasse 14, 3800 Interlaken',
      contactEmail: 'contact@alpinewonders.ch',
      contactPhone: '+41 33 826 1234',
      website: 'https://alpinewonders.ch',
      logoUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=100',
      description: 'Premier Swiss alpine trekking, glacier expeditions, and luxury panoramic train packages.',
      languages: ['English', 'German', 'French'],
      operatingDestinations: ['Switzerland', 'Austria', 'France'],
      commissionRate: 15.0,
      kycStatus: 'approved',
      approvalStatus: 'approved',
      rating: 4.96,
      totalBookings: 642,
      verifiedBadge: true,
      isWithdrawalRestricted: false,
      riskLevel: 'low',
      createdAt: '2025-11-10T09:00:00Z',
    },
    {
      id: 'prov-2',
      legalName: 'PT Bali Paradise Adventures',
      displayName: 'Bali Island Escapes',
      slug: 'bali-island-escapes',
      providerType: 'agency',
      registrationNumber: 'ID-88392019',
      taxId: 'ID776655',
      country: 'Indonesia',
      address: 'Jl. Raya Ubud No. 88, Gianyar, Bali',
      contactEmail: 'hello@baliescapes.id',
      contactPhone: '+62 361 975 123',
      website: 'https://baliescapes.id',
      logoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100',
      description: 'Authentic cultural tours, private villa retreats, and hidden waterfalls throughout Bali and Lombok.',
      languages: ['English', 'Indonesian'],
      operatingDestinations: ['Bali, Indonesia', 'Lombok', 'Komodo'],
      commissionRate: 14.5,
      kycStatus: 'approved',
      approvalStatus: 'approved',
      rating: 4.92,
      totalBookings: 810,
      verifiedBadge: true,
      isWithdrawalRestricted: false,
      riskLevel: 'low',
      createdAt: '2025-08-14T11:30:00Z',
    },
    {
      id: 'prov-3',
      legalName: 'Serengeti Horizons Safari Ltd',
      displayName: 'Serengeti Horizons',
      slug: 'serengeti-horizons',
      providerType: 'tour_operator',
      registrationNumber: 'TZ-448201',
      taxId: 'TZ112233',
      country: 'Tanzania',
      address: 'Safari Way, Clocktower, Arusha',
      contactEmail: 'safari@serengetihorizons.co.tz',
      contactPhone: '+255 27 250 8899',
      website: 'https://serengetihorizons.co.tz',
      logoUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=100',
      description: 'Eco-certified game drives, hot air balloon safaris, and luxury tented camp management.',
      languages: ['English', 'Swahili'],
      operatingDestinations: ['Tanzania', 'Kenya'],
      commissionRate: 16.0,
      kycStatus: 'approved',
      approvalStatus: 'approved',
      rating: 4.98,
      totalBookings: 290,
      verifiedBadge: true,
      isWithdrawalRestricted: false,
      riskLevel: 'low',
      createdAt: '2025-09-02T15:45:00Z',
    },
    {
      id: 'prov-4',
      legalName: 'Himalayan Sherpa Treks & Expeditions',
      displayName: 'Himalayan Expeditions',
      slug: 'himalayan-expeditions',
      providerType: 'guide',
      registrationNumber: 'NP-102948',
      taxId: 'NP554433',
      country: 'Nepal',
      address: 'Thamel Marg, Kathmandu',
      contactEmail: 'info@himalayanexp.np',
      contactPhone: '+977 1 441 8920',
      website: 'https://himalayanexp.np',
      description: 'High-altitude mountaineering, Everest Base Camp trekking, and Annapurna circuit guiding.',
      languages: ['English', 'Nepali', 'Tibetan'],
      operatingDestinations: ['Nepal', 'Tibet', 'Bhutan'],
      commissionRate: 15.0,
      kycStatus: 'under_review',
      approvalStatus: 'pending',
      rating: 4.88,
      totalBookings: 145,
      verifiedBadge: false,
      isWithdrawalRestricted: true,
      riskLevel: 'medium',
      createdAt: '2026-08-30T10:20:00Z',
    },
  ]

  async list(cursor?: string, limit = 20): Promise<{ ok: true; data: ProviderListResponse } | { ok: false; error: string }> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (cursor) params = params.set('cursor', cursor)
      const data = await firstValueFrom(this.http.get<ProviderListResponse>(this.baseUrl, { params }))
      return { ok: true, data }
    } catch {
      return {
        ok: true,
        data: {
          items: [...this.mockProviders],
          total: this.mockProviders.length,
          hasMore: false,
        },
      }
    }
  }

  async getById(id: string): Promise<{ ok: true; data: Provider } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<Provider>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      const found = this.mockProviders.find(p => p.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'Provider not found' }
    }
  }

  async create(dto: NewProvider): Promise<{ ok: true; data: Provider } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<Provider>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      const newProvider: Provider = {
        ...dto,
        id: `prov-${Date.now()}`,
        rating: 5.0,
        totalBookings: 0,
        createdAt: new Date().toISOString(),
      }
      this.mockProviders.unshift(newProvider)
      return { ok: true, data: newProvider }
    }
  }

  async update(id: string, dto: UpdateProvider): Promise<{ ok: true; data: Provider } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<Provider>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      const idx = this.mockProviders.findIndex(p => p.id === id)
      if (idx !== -1) {
        this.mockProviders[idx] = { ...this.mockProviders[idx], ...dto }
        return { ok: true, data: this.mockProviders[idx] }
      }
      return { ok: false, error: 'Provider not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockProviders = this.mockProviders.filter(p => p.id !== id)
      return { ok: true }
    }
  }
}
