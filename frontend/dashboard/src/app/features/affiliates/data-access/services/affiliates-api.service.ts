import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { AffiliateAccount } from '../models/affiliates.model'
import { CreateAffiliateInput, UpdateAffiliateInput, AffiliateListResponse } from '../models/affiliates-api.types'

@Injectable({
  providedIn: 'root',
})
export class AffiliatesApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('affiliate-accounts')

  private mockAffiliates: AffiliateAccount[] = [
    {
      id: 'aff-001',
      userId: 'usr-wanderlust',
      partnerName: 'Wanderlust Chronicles (YouTube)',
      partnerEmail: 'creators@wanderlustchroma.com',
      referralCode: 'WANDERLUST10',
      commissionRate: 10.0,
      totalClicks: 3420,
      totalBookings: 142,
      totalCommissionEarned: 14250.0,
      pendingPayout: 1840.0,
      currency: 'USD',
      status: 'active',
      referralUrl: 'https://traveller.ai/?ref=WANDERLUST10',
      createdAt: '2025-01-15T10:00:00.000Z',
    },
    {
      id: 'aff-002',
      userId: 'usr-swissvibes',
      partnerName: 'Swiss Alpine Hikers Club',
      partnerEmail: 'partnerships@swisshikers.ch',
      referralCode: 'ALPINIST',
      commissionRate: 8.5,
      totalClicks: 2150,
      totalBookings: 98,
      totalCommissionEarned: 9820.0,
      pendingPayout: 920.0,
      currency: 'USD',
      status: 'active',
      referralUrl: 'https://traveller.ai/?ref=ALPINIST',
      createdAt: '2025-02-01T14:30:00.000Z',
    },
    {
      id: 'aff-003',
      userId: 'usr-balilux',
      partnerName: 'Luxury Bali Retreats Blog',
      partnerEmail: 'editorial@balilux.me',
      referralCode: 'BALIVIP',
      commissionRate: 7.5,
      totalClicks: 1890,
      totalBookings: 64,
      totalCommissionEarned: 6450.0,
      pendingPayout: 650.0,
      currency: 'USD',
      status: 'active',
      referralUrl: 'https://traveller.ai/?ref=BALIVIP',
      createdAt: '2025-02-12T09:00:00.000Z',
    },
    {
      id: 'aff-004',
      userId: 'usr-nomadlife',
      partnerName: 'Nomad Compass Podcast',
      partnerEmail: 'sponsor@nomadcompass.fm',
      referralCode: 'NOMAD2025',
      commissionRate: 8.0,
      totalClicks: 940,
      totalBookings: 28,
      totalCommissionEarned: 2480.0,
      pendingPayout: 320.0,
      currency: 'USD',
      status: 'pending',
      referralUrl: 'https://traveller.ai/?ref=NOMAD2025',
      createdAt: '2025-03-01T11:20:00.000Z',
    },
    {
      id: 'aff-005',
      userId: 'usr-spamexp',
      partnerName: 'Global Coupon Scraper Net',
      partnerEmail: 'traffic@dealcrawler.io',
      referralCode: 'CHEAPTRIP',
      commissionRate: 5.0,
      totalClicks: 8400,
      totalBookings: 2,
      totalCommissionEarned: 120.0,
      pendingPayout: 0.0,
      currency: 'USD',
      status: 'suspended',
      referralUrl: 'https://traveller.ai/?ref=CHEAPTRIP',
      createdAt: '2024-11-20T08:00:00.000Z',
    },
  ]

  async list(status?: string): Promise<{ ok: true; data: AffiliateListResponse } | { ok: false; error: string }> {
    try {
      const query = status && status !== 'all' ? `?status=${status}` : ''
      const res = await firstValueFrom(this.http.get<AffiliateListResponse>(`${this.baseUrl}${query}`))
      return { ok: true, data: res }
    } catch {
      let filtered = [...this.mockAffiliates]
      if (status && status !== 'all') {
        filtered = filtered.filter(a => a.status === status)
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

  async get(id: string): Promise<{ ok: true; data: AffiliateAccount } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.get<AffiliateAccount>(`${this.baseUrl}/${id}`))
      return { ok: true, data: res }
    } catch {
      const found = this.mockAffiliates.find(a => a.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'Affiliate account not found' }
    }
  }

  async create(dto: CreateAffiliateInput): Promise<{ ok: true; data: AffiliateAccount } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.post<AffiliateAccount>(this.baseUrl, dto))
      return { ok: true, data: res }
    } catch {
      const newAcc: AffiliateAccount = {
        ...dto,
        id: `aff-${Date.now()}`,
        totalClicks: 0,
        totalBookings: 0,
        totalCommissionEarned: 0,
        pendingPayout: 0,
        referralUrl: `https://traveller.ai/?ref=${dto.referralCode}`,
        createdAt: new Date().toISOString(),
      }
      this.mockAffiliates.unshift(newAcc)
      return { ok: true, data: newAcc }
    }
  }

  async update(id: string, dto: UpdateAffiliateInput): Promise<{ ok: true; data: AffiliateAccount } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.patch<AffiliateAccount>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data: res }
    } catch {
      const idx = this.mockAffiliates.findIndex(a => a.id === id)
      if (idx !== -1) {
        this.mockAffiliates[idx] = {
          ...this.mockAffiliates[idx],
          ...dto,
          updatedAt: new Date().toISOString(),
        }
        return { ok: true, data: this.mockAffiliates[idx] }
      }
      return { ok: false, error: 'Affiliate account not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockAffiliates = this.mockAffiliates.filter(a => a.id !== id)
      return { ok: true }
    }
  }
}
