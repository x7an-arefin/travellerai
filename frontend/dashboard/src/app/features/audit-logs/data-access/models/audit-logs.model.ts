export type AuditSeverity = 'info' | 'warning' | 'critical'

export interface AuditLog {
  id: string
  actorId?: string
  actorName: string
  actorEmail?: string
  actorRole: string
  action: string
  entityType: string
  entityId?: string
  previousState?: Record<string, any> | null
  newState?: Record<string, any> | null
  ipAddress?: string
  userAgent?: string
  correlationId?: string
  severity: AuditSeverity
  createdAt: string
}
