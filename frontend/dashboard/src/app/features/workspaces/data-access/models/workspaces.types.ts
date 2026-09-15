export interface WorkspaceItem {
  id: string
  name: string
  slug: string
  plan: 'Enterprise Pro' | 'Team Starter' | 'Custom SLA'
  memberCount: number
  region: string
  monthlySpend: string
  isCurrent: boolean
  providerType?: string
  status?: string
  contactEmail?: string
  contactPhone?: string
}

export interface NewWorkspaceDto {
  name: string
  slug: string
  region: string
  providerType?: string
  contactEmail?: string
  contactPhone?: string
}
