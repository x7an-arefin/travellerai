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


export const exchangeRateTable = pgTable(
  'exchange_rates',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fromCurrency: varchar("from_currency", { length: 3 }).notNull(),
    toCurrency: varchar("to_currency", { length: 3 }).notNull(),
    rate: decimal("rate", { precision: 18, scale: 8 }).notNull(),
    source: varchar("source", { length: 50 }),
    effectiveDate: timestamp("effective_date", { withTimezone: true }).notNull(),
    isManualOverride: boolean("is_manual_override").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    exchange_rates_pair_idx: index('exchange_rates_pair_idx').on(table.fromCurrency, table.toCurrency),
    exchange_rates_date_idx: index('exchange_rates_date_idx').on(table.effectiveDate),
  })
);

export type ExchangeRateInsert = typeof exchangeRateTable.$inferInsert;
export type ExchangeRateSelect = typeof exchangeRateTable.$inferSelect;
