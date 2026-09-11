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

export const statusEnum = pgEnum('gift_cards_status', ['active', 'redeemed', 'expired', 'cancelled']);


export const giftCardTable = pgTable(
  'gift_cards',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 50 }).unique().notNull(),
    initialBalance: decimal("initial_balance", { precision: 10, scale: 2 }).notNull(),
    currentBalance: decimal("current_balance", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    purchaserId: uuid("purchaser_id"),
    recipientEmail: varchar("recipient_email", { length: 255 }),
    recipientName: varchar("recipient_name", { length: 200 }),
    personalMessage: text("personal_message"),
    deliveryDate: timestamp("delivery_date", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    gift_cards_code_unique_idx: uniqueIndex('gift_cards_code_unique_idx').on(table.code),
    gift_cards_status_idx: index('gift_cards_status_idx').on(table.status, table.expiresAt),
  })
);

export type GiftCardInsert = typeof giftCardTable.$inferInsert;
export type GiftCardSelect = typeof giftCardTable.$inferSelect;
