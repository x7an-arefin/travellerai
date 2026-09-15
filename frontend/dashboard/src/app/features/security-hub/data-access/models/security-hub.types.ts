export interface CveItem {
  id: string
  cveCode: string
  packageName: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  cvssScore: number
  remediation: string
  status: 'open' | 'patched'
}

export interface SecurityAuditLog {
  id: string
  action: string
  actorRole: string
  entityType: string
  severity: 'info' | 'warning' | 'critical'
  ipAddress: string
  timestamp: string
}

export interface SecurityScorecard {
  postureScore: number
  criticalCount: number
  mediumAdvisories: number
  lastAuditTime: string
  complianceStatus: string
}
