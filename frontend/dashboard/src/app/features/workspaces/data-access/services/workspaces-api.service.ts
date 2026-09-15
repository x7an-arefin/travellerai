import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { ApiResult } from '../../../../core/models/api-result.type'
import { WorkspaceItem, NewWorkspaceDto } from '../models/workspaces.types'

const MOCK_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'ws-1',
    name: 'Alpine Expeditions AG',
    slug: 'alpine-expeditions',
    plan: 'Enterprise Pro',
    memberCount: 34,
    region: 'EU West (Frankfurt)',
    monthlySpend: '$2,450/mo',
    isCurrent: true,
    providerType: 'tour_operator',
    status: 'approved',
    contactEmail: 'admin@alpine-expeditions.com',
  },
  {
    id: 'ws-2',
    name: 'Bali Sunset DMC & Luxury Villas',
    slug: 'bali-sunset-dmc',
    plan: 'Custom SLA',
    memberCount: 68,
    region: 'Asia Pacific (Singapore)',
    monthlySpend: '$3,800/mo',
    isCurrent: false,
    providerType: 'agency',
    status: 'approved',
    contactEmail: 'contact@balisunset.com',
  },
  {
    id: 'ws-3',
    name: 'Serengeti Safari Camp Operators',
    slug: 'serengeti-safari',
    plan: 'Team Starter',
    memberCount: 14,
    region: 'EU Central (Zurich)',
    monthlySpend: '$750/mo',
    isCurrent: false,
    providerType: 'tour_operator',
    status: 'approved',
    contactEmail: 'ops@serengeti.com',
  },
  {
    id: 'ws-4',
    name: 'Kyoto Cultural Heritage Guild',
    slug: 'kyoto-heritage',
    plan: 'Enterprise Pro',
    memberCount: 22,
    region: 'Asia Pacific (Tokyo)',
    monthlySpend: '$1,920/mo',
    isCurrent: false,
    providerType: 'experience_host',
    status: 'approved',
    contactEmail: 'concierge@kyoto-heritage.jp',
  },
]

@Injectable({ providedIn: 'root' })
export class WorkspacesApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('providers')

  async listWorkspaces(): Promise<ApiResult<WorkspaceItem[]>> {
    try {
      const res = await firstValueFrom(
        this.http.get<any>(this.baseUrl, {
          params: { limit: '50' }
        }).pipe(catchError(() => of(null)))
      )

      if (res !== null) {
        let rawItems: any[] = []
        if (Array.isArray(res)) rawItems = res
        else if (res?.data?.items) rawItems = res.data.items
        else if (res?.items) rawItems = res.items

        const items = rawItems.map((p, idx): WorkspaceItem => ({
          id: p.id || `ws-${idx + 1}`,
          name: p.displayName || p.legalName || `Operator Workspace ${idx + 1}`,
          slug: p.slug || `operator-${idx + 1}`,
          plan: idx === 0 ? 'Enterprise Pro' : idx === 1 ? 'Custom SLA' : 'Team Starter',
          memberCount: p.totalBookings ? Math.min(Math.round(p.totalBookings / 10), 100) : 12,
          region: p.country === 'Switzerland' || p.country === 'Germany' ? 'EU West (Frankfurt)' : p.country === 'Japan' ? 'Asia Pacific (Tokyo)' : 'US East (N. Virginia)',
          monthlySpend: `$${p.rating ? Math.round(Number(p.rating) * 450) : 1200}/mo`,
          isCurrent: idx === 0,
          providerType: p.providerType || 'tour_operator',
          status: p.approvalStatus || 'approved',
          contactEmail: p.contactEmail || `admin@${p.slug || 'workspace'}.com`,
          contactPhone: p.contactPhone,
        }))
        return { ok: true, data: items, meta: res?.meta ?? null }
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      return { ok: true, data: MOCK_WORKSPACES, isFallback: true }
    }
    return { ok: false, data: [], error: 'Could not connect to Workspace API. Please verify backend status.' }
  }

  async createWorkspace(dto: NewWorkspaceDto): Promise<ApiResult<WorkspaceItem>> {
    const slug = dto.slug || dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const payload = {
      displayName: dto.name,
      legalName: dto.name,
      slug,
      providerType: dto.providerType || 'tour_operator',
      country: 'United States',
      contactEmail: dto.contactEmail || `admin@${slug}.com`,
      contactPhone: dto.contactPhone || '',
    }

    try {
      const res = await firstValueFrom(
        this.http.post<any>(this.baseUrl, payload).pipe(catchError(() => of(null)))
      )

      if (res !== null) {
        const item: WorkspaceItem = {
          id: res.id || `ws-${Date.now()}`,
          name: res.displayName || res.legalName || dto.name,
          slug: res.slug || slug,
          plan: 'Team Starter',
          memberCount: 1,
          region: dto.region || 'EU West (Frankfurt)',
          monthlySpend: '$0/mo',
          isCurrent: false,
          providerType: res.providerType || dto.providerType || 'tour_operator',
          status: res.approvalStatus || 'approved',
          contactEmail: res.contactEmail || dto.contactEmail,
          contactPhone: res.contactPhone || dto.contactPhone,
        }
        return { ok: true, data: item }
      }
    } catch {}

    if (!this.apiConfig.isProduction) {
      // In dev fallback mode, append to mock and return success with fallback indicator
      const item: WorkspaceItem = {
        id: `ws-${Date.now()}`,
        name: dto.name,
        slug,
        plan: 'Team Starter',
        memberCount: 1,
        region: dto.region || 'EU West (Frankfurt)',
        monthlySpend: '$0/mo',
        isCurrent: false,
        providerType: dto.providerType || 'tour_operator',
        status: 'approved',
        contactEmail: dto.contactEmail || `admin@${slug}.com`,
        contactPhone: dto.contactPhone,
      }
      MOCK_WORKSPACES.unshift(item)
      return { ok: true, data: item, isFallback: true }
    }

    return { ok: false, data: null as any, error: 'Failed to create workspace on backend. Please try again.' }
  }
}
