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

export const statusEnum = pgEnum('withdrawal_requests_status', ['draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed']);


export const withdrawalRequestTable = pgTable(
  'withdrawal_requests',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    payoutAccountId: uuid("payout_account_id").notNull(),
    requestedAmount: decimal("requested_amount", { precision: 12, scale: 2 }).notNull(),
    feeAmount: decimal("fee_amount", { precision: 12, scale: 2 }),
    netAmount: decimal("net_amount", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: statusEnum('status').default('draft'),
    payoutMethod: varchar("payout_method", { length: 100 }),
    transactionReference: varchar("transaction_reference", { length: 200 }),
    providerNotes: text("provider_notes"),
    adminNotes: text("admin_notes"),
    reviewedBy: uuid("reviewed_by"),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    withdrawal_requests_provider_status_idx: index('withdrawal_requests_provider_status_idx').on(table.providerId, table.status),
    withdrawal_requests_status_idx: index('withdrawal_requests_status_idx').on(table.status),
  })
);

export type WithdrawalRequestInsert = typeof withdrawalRequestTable.$inferInsert;
export type WithdrawalRequestSelect = typeof withdrawalRequestTable.$inferSelect;
