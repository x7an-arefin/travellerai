import type { AuditLogSelect, AuditLogInsert } from './audit-log.schema.js';

export type AuditLogEntity = AuditLogSelect;

export type NewAuditLog = AuditLogInsert;

export type UpdateAuditLog = Partial<Omit<AuditLogEntity, 'id'>> & {
  id: string;
};

export interface IAuditLogRepository {
  findById(id: string): Promise<AuditLogEntity | null>;
  findAll(params: ListAuditLogParams): Promise<ListAuditLogResult>;
  create(data: NewAuditLog): Promise<AuditLogEntity>;
  update(data: UpdateAuditLog): Promise<AuditLogEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListAuditLogParams {
  cursor?: string;
  limit?: number;
  actorId?: string;
  entityType?: string;
  severity?: string;

}

export interface ListAuditLogResult {
  items: AuditLogEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
