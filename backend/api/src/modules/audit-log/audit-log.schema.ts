import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  bigint,
  decimal,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const severityEnum = pgEnum('audit_logs_severity', ['info', 'warning', 'critical']);


export const auditLogTable = pgTable(
  'audit_logs',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorId: uuid("actor_id"),
    actorRole: varchar("actor_role", { length: 100 }),
    action: varchar("action", { length: 200 }).notNull(),
    entityType: varchar("entity_type", { length: 100 }),
    entityId: uuid("entity_id"),
    previousState: jsonb("previous_state"),
    newState: jsonb("new_state"),
    ipAddress: varchar("ip_address", { length: 50 }),
    userAgent: varchar("user_agent", { length: 500 }),
    correlationId: varchar("correlation_id", { length: 100 }),
    severity: severityEnum('severity').default('info'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    audit_logs_actor_idx: index('audit_logs_actor_idx').on(table.actorId),
    audit_logs_entity_idx: index('audit_logs_entity_idx').on(table.entityType, table.entityId),
    audit_logs_action_idx: index('audit_logs_action_idx').on(table.action),
    audit_logs_severity_idx: index('audit_logs_severity_idx').on(table.severity),
  })
);

export type AuditLogInsert = typeof auditLogTable.$inferInsert;
export type AuditLogSelect = typeof auditLogTable.$inferSelect;
