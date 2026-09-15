export type DealStage = 'discovery' | 'qualified' | 'proposal' | 'negotiation' | 'won'

export interface DealActivity {
  date: string
  type: 'call' | 'email' | 'meeting' | 'note'
  note: string
}

export interface DealItem {
  id: string
  title: string
  company: string
  value: number
  probability: number
  stage: DealStage
  owner: {
    name: string
    avatar?: string
  }
  closeDate: string
  activities: DealActivity[]
  quotationId?: string
}

export interface CreateDealPayload {
  title: string
  company: string
  value: number
  probability: number
  stage: DealStage
  closeDate?: string
}

export interface DealStats {
  totalPipelineValue: number
  weightedForecastValue: number
  activeDealsCount: number
  winRate: number
}
