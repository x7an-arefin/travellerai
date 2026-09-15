import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { CreateDealPayload, DealItem, DealStage, DealStats } from '../models/deals.model'

@Injectable({
  providedIn: 'root',
})
export class DealsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('provider-quotations')

  private fallbackDeals: DealItem[] = [
    {
      id: 'deal-1',
      title: 'Google EMEA Annual Summit - Swiss Alps Retreat',
      company: 'Google Europe HQ',
      value: 145000,
      probability: 80,
      stage: 'negotiation',
      owner: { name: 'Sarah Jenkins', avatar: '' },
      closeDate: 'Oct 15, 2026',
      activities: [
        { date: 'Sep 12', type: 'call', note: 'Reviewed panoramic helicopter charter options with VP of Events.' },
        { date: 'Sep 08', type: 'email', note: 'Sent updated catering quote for 45 participants.' },
      ],
    },
    {
      id: 'deal-2',
      title: 'McKinsey Executive Partner Offsite - Serengeti Safari',
      company: 'McKinsey & Company',
      value: 220000,
      probability: 60,
      stage: 'proposal',
      owner: { name: 'David Kim', avatar: '' },
      closeDate: 'Nov 01, 2026',
      activities: [
        { date: 'Sep 14', type: 'meeting', note: 'Presented luxury tented camp private buyout proposal.' },
      ],
    },
    {
      id: 'deal-3',
      title: 'Kyoto Cultural Immersion - B2B Agency Partnership',
      company: 'Nomad Global Travels',
      value: 85000,
      probability: 40,
      stage: 'qualified',
      owner: { name: 'Elena Rostova', avatar: '' },
      closeDate: 'Nov 20, 2026',
      activities: [
        { date: 'Sep 10', type: 'email', note: 'Drafted SLA agreement for recurring seasonal bookings.' },
      ],
    },
    {
      id: 'deal-4',
      title: 'Iceland Volcanic Exploration Charter',
      company: 'Nordic Adventure Club',
      value: 54000,
      probability: 95,
      stage: 'won',
      owner: { name: 'Sarah Jenkins', avatar: '' },
      closeDate: 'Sep 05, 2026',
      activities: [
        { date: 'Sep 05', type: 'call', note: 'Deposit payment received via wire transfer.' },
        { date: 'Aug 29', type: 'meeting', note: 'Signed 14-day Defender fleet charter contract.' },
      ],
    },
    {
      id: 'deal-5',
      title: 'Amalfi Coast Superyacht & Villa Experience',
      company: 'Apex Luxury Lifestyle',
      value: 310000,
      probability: 25,
      stage: 'discovery',
      owner: { name: 'David Kim', avatar: '' },
      closeDate: 'Dec 10, 2026',
      activities: [
        { date: 'Sep 13', type: 'call', note: 'Initial qualification call with family office manager.' },
      ],
    },
  ]

  getDeals(): Observable<DealItem[]> {
    return this.http.get<{ data: any[] } | any[]>(this.baseUrl).pipe(
      map((res) => {
        const rows = Array.isArray(res) ? res : res.data || []
        if (!rows || rows.length === 0) {
          return this.fallbackDeals
        }
        return this.mapQuotationsToDeals(rows)
      }),
      catchError(() => of(this.fallbackDeals))
    )
  }

  async loadDeals(): Promise<DealItem[]> {
    try {
      const deals = await firstValueFrom(this.getDeals())
      return deals && deals.length > 0 ? deals : this.fallbackDeals
    } catch {
      return this.fallbackDeals
    }
  }

  async createDeal(payload: CreateDealPayload): Promise<DealItem> {
    const newDeal: DealItem = {
      id: `deal-${Date.now()}`,
      title: payload.title,
      company: payload.company,
      value: Number(payload.value) || 10000,
      probability: Number(payload.probability) || 50,
      stage: payload.stage,
      owner: { name: 'Alex Carter', avatar: '' },
      closeDate: payload.closeDate || 'Nov 30, 2026',
      activities: [
        { date: 'Today', type: 'note', note: 'Opportunity created in pipeline.' },
      ],
    }

    try {
      await firstValueFrom(
        this.http.post(this.baseUrl, {
          title: payload.title,
          totalPrice: payload.value,
          currency: 'USD',
          status: this.mapStageToQuotationStatus(payload.stage),
          terms: `CRM deal with ${payload.company}`,
          validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
        }).pipe(catchError(() => of(null)))
      )
    } catch {
      // Offline fallback
    }

    this.fallbackDeals.unshift(newDeal)
    return newDeal
  }

  async updateDealStage(dealId: string, stage: DealStage): Promise<boolean> {
    const deal = this.fallbackDeals.find((d) => d.id === dealId)
    if (deal) {
      deal.stage = stage
    }
    return true
  }

  async addActivityNote(dealId: string, note: string): Promise<boolean> {
    const deal = this.fallbackDeals.find((d) => d.id === dealId)
    if (deal && note.trim()) {
      deal.activities.unshift({
        date: 'Today',
        type: 'note',
        note: note.trim(),
      })
    }
    return true
  }

  async markAsWon(dealId: string): Promise<boolean> {
    const deal = this.fallbackDeals.find((d) => d.id === dealId)
    if (deal) {
      deal.stage = 'won'
      deal.probability = 100
      deal.activities.unshift({
        date: 'Today',
        type: 'meeting',
        note: 'Contract signed! Deal marked as WON.',
      })
    }
    return true
  }

  calculateStats(deals: DealItem[]): DealStats {
    const totalPipelineValue = deals.reduce((sum, d) => sum + d.value, 0)
    const weightedForecastValue = deals.reduce((sum, d) => sum + (d.value * d.probability) / 100, 0)
    const activeDealsCount = deals.filter((d) => d.stage !== 'won').length
    const wonCount = deals.filter((d) => d.stage === 'won').length
    const winRate = deals.length > 0 ? (wonCount / deals.length) * 100 : 0

    return {
      totalPipelineValue,
      weightedForecastValue,
      activeDealsCount,
      winRate,
    }
  }

  private mapQuotationsToDeals(rows: any[]): DealItem[] {
    return rows.map((q, idx) => {
      let stage: DealStage = 'proposal'
      let prob = 50
      if (q.status === 'draft') {
        stage = 'discovery'
        prob = 25
      } else if (q.status === 'submitted') {
        stage = 'proposal'
        prob = 60
      } else if (q.status === 'accepted') {
        stage = 'won'
        prob = 100
      } else if (q.status === 'rejected' || q.status === 'expired') {
        stage = 'discovery'
        prob = 10
      }

      return {
        id: q.id || `quot-${idx + 1}`,
        quotationId: q.id,
        title: q.title || 'Custom Tour Quotation',
        company: q.company || 'Enterprise Travel Client',
        value: Number(q.totalPrice) || 35000,
        probability: prob,
        stage,
        owner: { name: 'Sarah Jenkins', avatar: '' },
        closeDate: q.validUntil ? new Date(q.validUntil).toLocaleDateString() : 'Nov 15, 2026',
        activities: [
          { date: 'Recent', type: 'call', note: q.terms || 'Provider quotation issued.' },
        ],
      }
    })
  }

  private mapStageToQuotationStatus(stage: DealStage): string {
    switch (stage) {
      case 'discovery': return 'draft'
      case 'qualified': return 'draft'
      case 'proposal': return 'submitted'
      case 'negotiation': return 'submitted'
      case 'won': return 'accepted'
    }
  }
}
