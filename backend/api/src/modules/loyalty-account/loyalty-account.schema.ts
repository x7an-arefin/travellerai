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

export const tierEnum = pgEnum('loyalty_accounts_tier', ['bronze', 'silver', 'gold', 'platinum']);


export const loyaltyAccountTable = pgTable(
  'loyalty_accounts',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").unique().notNull(),
    pointsBalance: integer("points_balance").default(0),
    lifetimeEarned: integer("lifetime_earned").default(0),
    lifetimeRedeemed: integer("lifetime_redeemed").default(0),
    tier: tierEnum('tier').default('bronze'),
    tierUpdatedAt: timestamp("tier_updated_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    loyalty_accounts_user_unique_idx: uniqueIndex('loyalty_accounts_user_unique_idx').on(table.userId),
    loyalty_accounts_tier_idx: index('loyalty_accounts_tier_idx').on(table.tier),
  })
);

export type LoyaltyAccountInsert = typeof loyaltyAccountTable.$inferInsert;
export type LoyaltyAccountSelect = typeof loyaltyAccountTable.$inferSelect;
