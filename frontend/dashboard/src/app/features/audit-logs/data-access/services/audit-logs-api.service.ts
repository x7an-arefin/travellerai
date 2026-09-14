import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { AuditLog } from '../models/audit-logs.model'
import { AuditLogListResponse } from '../models/audit-logs-api.types'

@Injectable({
  providedIn: 'root',
})
export class AuditLogsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('audit-logs')

  private mockLogs: AuditLog[] = [
    {
      id: 'aud-001',
      actorId: 'usr-arefin',
      actorName: 'Sultanul Arefin',
      actorEmail: 'arefin@traveller.ai',
      actorRole: 'super_admin',
      action: 'PROVIDER_KYC_APPROVED',
      entityType: 'kyc_document',
      entityId: 'kyc-001',
      previousState: { status: 'submitted', reviewNotes: null },
      newState: { status: 'approved', reviewNotes: 'Swiss Commercial Register validated.' },
      ipAddress: '194.230.145.22',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0',
      correlationId: 'req-9901-kyc-appr',
      severity: 'info',
      createdAt: '2025-01-10T14:20:00.000Z',
    },
    {
      id: 'aud-002',
      actorId: 'usr-finance-sarah',
      actorName: 'Sarah Jenkins',
      actorEmail: 'finance@traveller.ai',
      actorRole: 'finance_admin',
      action: 'WITHDRAWAL_PAYOUT_SETTLED',
      entityType: 'withdrawal_request',
      entityId: 'wdr-001',
      previousState: { status: 'pending', processedAt: null },
      newState: { status: 'completed', processedAt: '2025-01-12T11:00:00Z', wireRef: 'WIRE-CH-99201948' },
      ipAddress: '185.220.101.5',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
      correlationId: 'req-8812-payout-ch',
      severity: 'info',
      createdAt: '2025-01-12T11:00:00.000Z',
    },
    {
      id: 'aud-003',
      actorId: 'usr-elena',
      actorName: 'Elena Rostova',
      actorEmail: 'elena@alpineadventures.com',
      actorRole: 'agency_owner',
      action: 'DEPARTURE_PRICE_OVERRIDE',
      entityType: 'departure',
      entityId: 'dep-101',
      previousState: { priceOverride: null, capacity: 12 },
      newState: { priceOverride: 3200, capacity: 12 },
      ipAddress: '84.115.22.9',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/125.0',
      correlationId: 'req-7714-price-ovr',
      severity: 'warning',
      createdAt: '2025-02-04T16:45:00.000Z',
    },
    {
      id: 'aud-004',
      actorId: 'usr-guide-marco',
      actorName: 'Marco Rossi',
      actorEmail: 'marco@swissguides.ch',
      actorRole: 'guide',
      action: 'PASSENGER_BOARDING_CHECKIN',
      entityType: 'booking',
      entityId: 'bk-swiss-901',
      previousState: { checkinStatus: 'pending', checkinTime: null },
      newState: { checkinStatus: 'checked_in', checkinTime: '2025-06-12T07:45:00Z' },
      ipAddress: '178.197.233.12',
      userAgent: 'Mobile Safari / iOS 17.4 (iPhone 15 Pro)',
      correlationId: 'req-4491-qr-chk',
      severity: 'info',
      createdAt: '2025-06-12T07:45:00.000Z',
    },
    {
      id: 'aud-005',
      actorId: 'sys-security',
      actorName: 'Platform Security Daemon',
      actorRole: 'system',
      action: 'FAILED_API_KEY_AUTHENTICATION',
      entityType: 'api_key',
      entityId: 'key-unknown',
      previousState: null,
      newState: { error: 'INVALID_SIGNATURE', attempts: 5, blockedForMinutes: 15 },
      ipAddress: '45.134.140.20',
      userAgent: 'python-requests/2.31.0',
      correlationId: 'req-0021-ratelimit',
      severity: 'critical',
      createdAt: '2025-06-15T03:12:00.000Z',
    },
  ]

  async list(severity?: string): Promise<{ ok: true; data: AuditLogListResponse } | { ok: false; error: string }> {
    try {
      const query = severity && severity !== 'all' ? `?severity=${severity}` : ''
      const res = await firstValueFrom(this.http.get<AuditLogListResponse>(`${this.baseUrl}${query}`))
      return { ok: true, data: res }
    } catch {
      let filtered = [...this.mockLogs]
      if (severity && severity !== 'all') {
        filtered = filtered.filter(l => l.severity === severity)
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
}
