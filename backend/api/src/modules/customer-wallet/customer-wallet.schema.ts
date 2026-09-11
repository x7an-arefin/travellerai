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

export const statusEnum = pgEnum('customer_wallets_status', ['active', 'frozen']);


export const customerWalletTable = pgTable(
  'customer_wallets',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").unique().notNull(),
    availableBalance: decimal("available_balance", { precision: 12, scale: 2 }).default('0'),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    customer_wallets_user_unique_idx: uniqueIndex('customer_wallets_user_unique_idx').on(table.userId),
  })
);

export type CustomerWalletInsert = typeof customerWalletTable.$inferInsert;
export type CustomerWalletSelect = typeof customerWalletTable.$inferSelect;
