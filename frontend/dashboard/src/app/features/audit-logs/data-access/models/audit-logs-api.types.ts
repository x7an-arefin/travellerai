import { AuditLog } from './audit-logs.model'

export interface AuditLogListResponse {
  items: AuditLog[]
  total?: number
  nextCursor?: string | null
}
