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

export const entryTypeEnum = pgEnum('ledger_entries_entry_type', ['credit', 'debit']);

export const accountTypeEnum = pgEnum('ledger_entries_account_type', ['customer_payment', 'provider_earning', 'platform_commission', 'service_fee', 'tax', 'gateway_fee', 'coupon_discount', 'wallet_credit', 'refund', 'chargeback', 'withdrawal', 'manual_adjustment']);

export const referenceTypeEnum = pgEnum('ledger_entries_reference_type', ['booking', 'transaction', 'withdrawal', 'refund', 'dispute', 'manual']);


export const ledgerEntryTable = pgTable(
  'ledger_entries',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entryType: entryTypeEnum('entry_type').default('credit'),
    accountType: accountTypeEnum('account_type').default('customer_payment'),
    referenceType: referenceTypeEnum('reference_type').default('booking'),
    referenceId: uuid("reference_id").notNull(),
    providerId: uuid("provider_id"),
    userId: uuid("user_id"),
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    balanceAfter: decimal("balance_after", { precision: 12, scale: 2 }),
    description: varchar("description", { length: 500 }),
    recordedBy: uuid("recorded_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    ledger_entries_provider_idx: index('ledger_entries_provider_idx').on(table.providerId),
    ledger_entries_user_idx: index('ledger_entries_user_idx').on(table.userId),
    ledger_entries_reference_idx: index('ledger_entries_reference_idx').on(table.referenceType, table.referenceId),
    ledger_entries_account_type_idx: index('ledger_entries_account_type_idx').on(table.accountType),
  })
);

export type LedgerEntryInsert = typeof ledgerEntryTable.$inferInsert;
export type LedgerEntrySelect = typeof ledgerEntryTable.$inferSelect;
