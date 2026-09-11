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

export const statusEnum = pgEnum('disputes_status', ['open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated']);


export const disputeTable = pgTable(
  'disputes',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull(),
    complainantId: uuid("complainant_id").notNull(),
    reason: varchar("reason", { length: 300 }).notNull(),
    description: text("description"),
    evidenceUrls: jsonb("evidence_urls"),
    status: statusEnum('status').default('open'),
    resolutionNotes: text("resolution_notes"),
    financialAdjustment: decimal("financial_adjustment", { precision: 12, scale: 2 }),
    assignedAgentId: uuid("assigned_agent_id"),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    disputes_booking_idx: index('disputes_booking_idx').on(table.bookingId),
    disputes_status_idx: index('disputes_status_idx').on(table.status),
    disputes_agent_idx: index('disputes_agent_idx').on(table.assignedAgentId, table.status),
  })
);

export type DisputeInsert = typeof disputeTable.$inferInsert;
export type DisputeSelect = typeof disputeTable.$inferSelect;
