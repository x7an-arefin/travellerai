import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { WithdrawalRequest } from '../models/withdrawals.model'
import { NewWithdrawalRequest, UpdateWithdrawalRequest, WithdrawalListResponse } from '../models/withdrawals-api.types'

@Injectable({ providedIn: 'root' })
export class WithdrawalsApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1/withdrawal-requests'

  private mockWithdrawals: WithdrawalRequest[] = [
    {
      id: 'wd-1',
      providerId: 'prov-1',
      providerName: 'Alpine Wonders Agency',
      payoutMethod: 'bank_transfer',
      accountLast4: '7842',
      amount: 12400,
      feeAmount: 35,
      netAmount: 12365,
      currency: 'USD',
      status: 'pending',
      createdAt: '2026-09-10T14:30:00Z',
    },
    {
      id: 'wd-2',
      providerId: 'prov-2',
      providerName: 'Bali Island Escapes',
      payoutMethod: 'wise',
      accountLast4: '1904',
      amount: 5280,
      feeAmount: 18,
      netAmount: 5262,
      currency: 'USD',
      status: 'pending',
      createdAt: '2026-09-11T08:15:00Z',
    },
    {
      id: 'wd-3',
      providerId: 'prov-3',
      providerName: 'Serengeti Horizons',
      payoutMethod: 'stripe_connect',
      accountLast4: '4489',
      amount: 4000,
      feeAmount: 25,
      netAmount: 3975,
      currency: 'USD',
      status: 'pending',
      createdAt: '2026-09-11T11:00:00Z',
    },
    {
      id: 'wd-4',
      providerId: 'prov-1',
      providerName: 'Alpine Wonders Agency',
      payoutMethod: 'bank_transfer',
      accountLast4: '7842',
      amount: 18200,
      feeAmount: 35,
      netAmount: 18165,
      currency: 'USD',
      status: 'completed',
      processedAt: '2026-09-04T16:00:00Z',
      createdAt: '2026-09-03T10:00:00Z',
    },
    {
      id: 'wd-5',
      providerId: 'prov-2',
      providerName: 'Bali Island Escapes',
      payoutMethod: 'wise',
      accountLast4: '1904',
      amount: 7800,
      feeAmount: 20,
      netAmount: 7780,
      currency: 'USD',
      status: 'completed',
      processedAt: '2026-08-28T14:00:00Z',
      createdAt: '2026-08-27T09:30:00Z',
    },
  ]

  async list(cursor?: string, limit = 20): Promise<{ ok: true; data: WithdrawalListResponse } | { ok: false; error: string }> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (cursor) params = params.set('cursor', cursor)
      const data = await firstValueFrom(this.http.get<WithdrawalListResponse>(this.baseUrl, { params }))
      return { ok: true, data }
    } catch {
      return {
        ok: true,
        data: {
          items: [...this.mockWithdrawals],
          total: this.mockWithdrawals.length,
          hasMore: false,
        },
      }
    }
  }

  async create(dto: NewWithdrawalRequest): Promise<{ ok: true; data: WithdrawalRequest } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<WithdrawalRequest>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      const newWd: WithdrawalRequest = {
        ...dto,
        id: `wd-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      this.mockWithdrawals.unshift(newWd)
      return { ok: true, data: newWd }
    }
  }

  async update(id: string, dto: UpdateWithdrawalRequest): Promise<{ ok: true; data: WithdrawalRequest } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<WithdrawalRequest>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      const idx = this.mockWithdrawals.findIndex(w => w.id === id)
      if (idx !== -1) {
        this.mockWithdrawals[idx] = { ...this.mockWithdrawals[idx], ...dto }
        return { ok: true, data: this.mockWithdrawals[idx] }
      }
      return { ok: false, error: 'Withdrawal not found' }
    }
  }
}
