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

export const gatewayEnum = pgEnum('payment_transactions_gateway', ['stripe', 'bkash', 'sslcommerz', 'paypal', 'paygov', 'manual_transfer', 'wallet', 'gift_card']);

export const paymentModeEnum = pgEnum('payment_transactions_payment_mode', ['platform_collection', 'direct_provider', 'hybrid']);

export const transactionTypeEnum = pgEnum('payment_transactions_transaction_type', ['full_payment', 'deposit', 'installment', 'balance_payment', 'refund', 'chargeback_reversal']);

export const statusEnum = pgEnum('payment_transactions_status', ['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed']);


export const paymentTransactionTable = pgTable(
  'payment_transactions',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull(),
    gateway: gatewayEnum('gateway').default('stripe'),
    paymentMode: paymentModeEnum('payment_mode').default('platform_collection'),
    transactionType: transactionTypeEnum('transaction_type').default('full_payment'),
    transactionReference: varchar("transaction_reference", { length: 200 }),
    gatewayTransactionId: varchar("gateway_transaction_id", { length: 200 }),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: statusEnum('status').default('pending'),
    failureReason: varchar("failure_reason", { length: 500 }),
    gatewayResponse: jsonb("gateway_response"),
    idempotencyKey: varchar("idempotency_key", { length: 100 }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    payment_transactions_booking_idx: index('payment_transactions_booking_idx').on(table.bookingId, table.status),
    payment_transactions_gateway_ref_idx: index('payment_transactions_gateway_ref_idx').on(table.gateway, table.transactionReference),
    payment_transactions_status_idx: index('payment_transactions_status_idx').on(table.status),
  })
);

export type PaymentTransactionInsert = typeof paymentTransactionTable.$inferInsert;
export type PaymentTransactionSelect = typeof paymentTransactionTable.$inferSelect;
