import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { CveItem, SecurityAuditLog, SecurityScorecard } from '../models/security-hub.types'

@Injectable({ providedIn: 'root' })
export class SecurityHubApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly auditUrl = this.apiConfig.buildUrl('api/v1/audit-logs')

  private mockAuditLogs: SecurityAuditLog[] = [
    {
      id: 'aud-1',
      action: 'API_KEY_ROTATED',
      actorRole: 'admin',
      entityType: 'api_tokens',
      severity: 'info',
      ipAddress: '192.168.1.104',
      timestamp: '2 mins ago',
    },
    {
      id: 'aud-2',
      action: 'SUSPICIOUS_LOGIN_BLOCKED',
      actorRole: 'anonymous',
      entityType: 'auth',
      severity: 'warning',
      ipAddress: '185.220.101.5',
      timestamp: '14 mins ago',
    },
    {
      id: 'aud-3',
      action: 'ORGANIZATION_RBAC_MODIFIED',
      actorRole: 'org_owner',
      entityType: 'providers',
      severity: 'info',
      ipAddress: '84.115.22.90',
      timestamp: '45 mins ago',
    },
    {
      id: 'aud-4',
      action: 'PAYMENT_ESCROW_RELEASED',
      actorRole: 'system',
      entityType: 'ledger_entries',
      severity: 'info',
      ipAddress: '10.0.4.12',
      timestamp: '1 hour ago',
    },
  ]

  readonly defaultCves: CveItem[] = [
    {
      id: 'cve-1',
      cveCode: 'CVE-2026-2189',
      packageName: 'node-tar (npm)',
      severity: 'Medium',
      cvssScore: 6.2,
      remediation: 'Upgrade to node-tar@6.2.2',
      status: 'open',
    },
    {
      id: 'cve-2',
      cveCode: 'CVE-2026-1944',
      packageName: 'axios (npm)',
      severity: 'Low',
      cvssScore: 3.8,
      remediation: 'Upgrade to axios@1.8.0',
      status: 'open',
    },
    {
      id: 'cve-3',
      cveCode: 'CVE-2026-0812',
      packageName: 'nginx (docker)',
      severity: 'High',
      cvssScore: 7.8,
      remediation: 'Base image bumped to alpine-3.20',
      status: 'patched',
    },
  ]

  getScorecard(): Observable<SecurityScorecard> {
    return of({
      postureScore: 96,
      criticalCount: 0,
      mediumAdvisories: 2,
      lastAuditTime: '12m ago',
      complianceStatus: 'SOC2 COMPLIANT',
    })
  }

  listAuditLogs(): Observable<SecurityAuditLog[]> {
    return this.http.get<any>(`${this.auditUrl}?limit=10`).pipe(
      map((res) => {
        let items: any[] = []
        if (Array.isArray(res)) items = res
        else if (res?.data?.items) items = res.data.items
        else if (res?.items) items = res.items

        if (items.length === 0) return this.mockAuditLogs

        return items.map((item, idx) => ({
          id: item.id || `aud-${idx + 1}`,
          action: item.action || 'SYSTEM_ACTION',
          actorRole: item.actorRole || 'admin',
          entityType: item.entityType || 'resource',
          severity: (item.severity as 'info' | 'warning' | 'critical') || 'info',
          ipAddress: item.ipAddress || '127.0.0.1',
          timestamp: item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `${idx * 15 + 2}m ago`,
        }))
      }),
      catchError(() => of(this.mockAuditLogs))
    )
  }
}
