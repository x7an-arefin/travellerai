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

export const accountTypeEnum = pgEnum('provider_payout_accounts_account_type', ['bank_account', 'mobile_wallet', 'payment_gateway']);

export const statusEnum = pgEnum('provider_payout_accounts_status', ['active', 'inactive', 'pending_verification']);


export const providerPayoutAccountTable = pgTable(
  'provider_payout_accounts',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    accountType: accountTypeEnum('account_type').default('bank_account'),
    providerName: varchar("provider_name", { length: 150 }).notNull(),
    accountNumber: varchar("account_number", { length: 100 }).notNull(),
    accountName: varchar("account_name", { length: 200 }).notNull(),
    routingNumber: varchar("routing_number", { length: 50 }),
    bankName: varchar("bank_name", { length: 200 }),
    branchCode: varchar("branch_code", { length: 50 }),
    country: varchar("country", { length: 100 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    isDefault: boolean("is_default").default(false),
    isVerified: boolean("is_verified").default(false),
    status: statusEnum('status').default('pending_verification'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    payout_accounts_provider_idx: index('payout_accounts_provider_idx').on(table.providerId, table.status),
    payout_accounts_default_idx: index('payout_accounts_default_idx').on(table.providerId, table.isDefault),
  })
);

export type ProviderPayoutAccountInsert = typeof providerPayoutAccountTable.$inferInsert;
export type ProviderPayoutAccountSelect = typeof providerPayoutAccountTable.$inferSelect;
