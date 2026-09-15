export interface EmployeeNode {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone?: string
  location: string
  status: 'active' | 'in_meeting' | 'on_leave'
  directReportsCount: number
  managerId?: string
  compensationTier: string
  startDate: string
  avatarInitials: string
  providerId?: string
}

export interface NewEmployeeDto {
  name: string
  role: string
  department: string
  email: string
  location: string
  phone?: string
  managerId?: string
}

export interface OrgOverviewStats {
  totalHeadcount: number
  activeDepartments: number
  remotePercentage: number
  retentionRate: number
}
