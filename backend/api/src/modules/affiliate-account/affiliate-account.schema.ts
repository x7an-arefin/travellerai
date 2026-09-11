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

export const statusEnum = pgEnum('affiliate_accounts_status', ['pending', 'active', 'suspended', 'rejected']);


export const affiliateAccountTable = pgTable(
  'affiliate_accounts',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").unique().notNull(),
    referralCode: varchar("referral_code", { length: 30 }).unique().notNull(),
    commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).notNull(),
    totalClicks: integer("total_clicks").default(0),
    totalBookings: integer("total_bookings").default(0),
    totalCommissionEarned: decimal("total_commission_earned", { precision: 12, scale: 2 }).default('0'),
    pendingPayout: decimal("pending_payout", { precision: 12, scale: 2 }).default('0'),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: statusEnum('status').default('pending'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    affiliate_accounts_user_unique_idx: uniqueIndex('affiliate_accounts_user_unique_idx').on(table.userId),
    affiliate_accounts_code_unique_idx: uniqueIndex('affiliate_accounts_code_unique_idx').on(table.referralCode),
    affiliate_accounts_status_idx: index('affiliate_accounts_status_idx').on(table.status),
  })
);

export type AffiliateAccountInsert = typeof affiliateAccountTable.$inferInsert;
export type AffiliateAccountSelect = typeof affiliateAccountTable.$inferSelect;
