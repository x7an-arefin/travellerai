import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { Coupon } from '../models/campaigns.model'
import { CreateCouponInput, UpdateCouponInput, CouponListResponse } from '../models/campaigns-api.types'

@Injectable({
  providedIn: 'root',
})
export class CampaignsApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1/coupons'

  private mockCoupons: Coupon[] = [
    {
      id: 'cpn-001',
      code: 'SUMMER2025',
      description: 'Summer kickoff 15% discount on all European expeditions',
      discountType: 'percentage',
      discountValue: 15,
      currency: 'USD',
      minBookingValue: 1500,
      maxDiscount: 400,
      startsAt: '2025-06-01T00:00:00.000Z',
      expiresAt: '2025-08-31T23:59:59.000Z',
      maxUses: 500,
      usedCount: 142,
      funder: 'marketplace',
      status: 'active',
      createdAt: '2025-01-10T10:00:00.000Z',
    },
    {
      id: 'cpn-002',
      code: 'EARLYBIRD10',
      description: 'Early bird booking discount for treks planned > 60 days ahead',
      discountType: 'percentage',
      discountValue: 10,
      currency: 'USD',
      minBookingValue: 1000,
      maxDiscount: 250,
      maxUses: 1000,
      usedCount: 420,
      funder: 'shared',
      status: 'active',
      createdAt: '2025-01-15T14:30:00.000Z',
    },
    {
      id: 'cpn-003',
      code: 'VIPSWISS100',
      description: 'Flat $100 voucher off Swiss Alps luxury departures',
      discountType: 'fixed',
      discountValue: 100,
      currency: 'USD',
      minBookingValue: 2500,
      maxUses: 100,
      usedCount: 78,
      funder: 'provider',
      status: 'active',
      createdAt: '2025-02-01T09:00:00.000Z',
    },
    {
      id: 'cpn-004',
      code: 'WINTERMAGIC',
      description: 'Winter season past promotional discount campaign',
      discountType: 'percentage',
      discountValue: 20,
      currency: 'USD',
      minBookingValue: 1200,
      maxUses: 200,
      usedCount: 200,
      funder: 'marketplace',
      status: 'expired',
      expiresAt: '2025-02-28T23:59:59.000Z',
      createdAt: '2024-11-15T10:00:00.000Z',
    },
  ]

  async list(status?: string): Promise<{ ok: true; data: CouponListResponse } | { ok: false; error: string }> {
    try {
      const query = status && status !== 'all' ? `?status=${status}` : ''
      const res = await firstValueFrom(this.http.get<CouponListResponse>(`${this.baseUrl}${query}`))
      return { ok: true, data: res }
    } catch {
      let filtered = [...this.mockCoupons]
      if (status && status !== 'all') {
        filtered = filtered.filter(c => c.status === status)
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

  async create(dto: CreateCouponInput): Promise<{ ok: true; data: Coupon } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.post<Coupon>(this.baseUrl, dto))
      return { ok: true, data: res }
    } catch {
      const newCoupon: Coupon = {
        ...dto,
        id: `cpn-${Date.now()}`,
        usedCount: 0,
        createdAt: new Date().toISOString(),
      }
      this.mockCoupons.unshift(newCoupon)
      return { ok: true, data: newCoupon }
    }
  }

  async update(id: string, dto: UpdateCouponInput): Promise<{ ok: true; data: Coupon } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.patch<Coupon>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data: res }
    } catch {
      const idx = this.mockCoupons.findIndex(c => c.id === id)
      if (idx !== -1) {
        this.mockCoupons[idx] = {
          ...this.mockCoupons[idx],
          ...dto,
          updatedAt: new Date().toISOString(),
        }
        return { ok: true, data: this.mockCoupons[idx] }
      }
      return { ok: false, error: 'Coupon not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockCoupons = this.mockCoupons.filter(c => c.id !== id)
      return { ok: true }
    }
  }
}
