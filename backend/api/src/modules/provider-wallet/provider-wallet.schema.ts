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


export const providerWalletTable = pgTable(
  'provider_wallets',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").unique().notNull(),
    pendingBalance: decimal("pending_balance", { precision: 12, scale: 2 }).default('0'),
    availableBalance: decimal("available_balance", { precision: 12, scale: 2 }).default('0'),
    reservedBalance: decimal("reserved_balance", { precision: 12, scale: 2 }).default('0'),
    withdrawnBalance: decimal("withdrawn_balance", { precision: 12, scale: 2 }).default('0'),
    negativeBalance: decimal("negative_balance", { precision: 12, scale: 2 }).default('0'),
    currency: varchar("currency", { length: 3 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    provider_wallets_provider_unique_idx: uniqueIndex('provider_wallets_provider_unique_idx').on(table.providerId),
  })
);

export type ProviderWalletInsert = typeof providerWalletTable.$inferInsert;
export type ProviderWalletSelect = typeof providerWalletTable.$inferSelect;
