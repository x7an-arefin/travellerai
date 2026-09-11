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

export const initiatedByEnum = pgEnum('refund_requests_initiated_by', ['traveler', 'provider', 'admin', 'system']);

export const refundMethodEnum = pgEnum('refund_requests_refund_method', ['original_payment', 'wallet', 'bank_transfer', 'mixed']);

export const statusEnum = pgEnum('refund_requests_status', ['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']);


export const refundRequestTable = pgTable(
  'refund_requests',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull(),
    initiatedBy: initiatedByEnum('initiated_by').default('traveler'),
    reason: varchar("reason", { length: 500 }).notNull(),
    description: text("description"),
    requestedAmount: decimal("requested_amount", { precision: 12, scale: 2 }).notNull(),
    approvedAmount: decimal("approved_amount", { precision: 12, scale: 2 }),
    cancellationFee: decimal("cancellation_fee", { precision: 12, scale: 2 }),
    refundMethod: refundMethodEnum('refund_method').default('original_payment'),
    status: statusEnum('status').default('pending'),
    reviewNotes: text("review_notes"),
    reviewedBy: uuid("reviewed_by"),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    refund_requests_booking_idx: index('refund_requests_booking_idx').on(table.bookingId, table.status),
    refund_requests_status_idx: index('refund_requests_status_idx').on(table.status),
  })
);

export type RefundRequestInsert = typeof refundRequestTable.$inferInsert;
export type RefundRequestSelect = typeof refundRequestTable.$inferSelect;
