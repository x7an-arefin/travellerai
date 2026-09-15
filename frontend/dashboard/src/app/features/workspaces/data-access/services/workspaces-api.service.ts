import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { WorkspaceItem, NewWorkspaceDto } from '../models/workspaces.types'

@Injectable({ providedIn: 'root' })
export class WorkspacesApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('api/v1/providers')

  private mockWorkspaces: WorkspaceItem[] = [
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
    },
  ]

  listWorkspaces(): Observable<WorkspaceItem[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((res) => {
        let items: any[] = []
        if (Array.isArray(res)) items = res
        else if (res?.data?.items) items = res.data.items
        else if (res?.items) items = res.items

        if (items.length === 0) return this.mockWorkspaces

        return items.map((p, idx): WorkspaceItem => ({
          id: p.id || `ws-${idx + 1}`,
          name: p.displayName || p.legalName || `Operator Workspace ${idx + 1}`,
          slug: p.slug || `operator-${idx + 1}`,
          plan: idx === 0 ? 'Enterprise Pro' : idx === 1 ? 'Custom SLA' : 'Team Starter',
          memberCount: p.totalBookings ? Math.min(Math.round(p.totalBookings / 10), 100) : 12,
          region: p.country === 'Switzerland' || p.country === 'Germany' ? 'EU West (Frankfurt)' : p.country === 'Japan' ? 'Asia Pacific (Tokyo)' : 'US East (N. Virginia)',
          monthlySpend: `$${(p.rating ? Math.round(Number(p.rating) * 450) : 1200)}/mo`,
          isCurrent: idx === 0,
          providerType: p.providerType || 'tour_operator',
          status: p.approvalStatus || 'approved',
        }))
      }),
      catchError(() => of(this.mockWorkspaces))
    )
  }

  createWorkspace(dto: NewWorkspaceDto): Observable<WorkspaceItem> {
    const item: WorkspaceItem = {
      id: `ws-${Date.now()}`,
      name: dto.name,
      slug: dto.slug || dto.name.toLowerCase().replace(/\s+/g, '-'),
      plan: 'Team Starter',
      memberCount: 1,
      region: dto.region,
      monthlySpend: '$0/mo',
      isCurrent: false,
      providerType: dto.providerType || 'tour_operator',
      status: 'approved',
    }

    const payload = {
      displayName: dto.name,
      legalName: dto.name,
      slug: item.slug,
      providerType: item.providerType,
      country: 'United States',
      contactEmail: `admin@${item.slug}.com`,
    }

    return this.http.post<any>(this.baseUrl, payload).pipe(
      map(() => item),
      catchError(() => of(item))
    )
  }
}
