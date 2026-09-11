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

export const statusEnum = pgEnum('provider_quotations_status', ['draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked']);


export const providerQuotationTable = pgTable(
  'provider_quotations',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    inquiryId: uuid("inquiry_id").notNull(),
    providerId: uuid("provider_id").notNull(),
    title: varchar("title", { length: 300 }).notNull(),
    itineraryDetails: jsonb("itinerary_details"),
    inclusions: jsonb("inclusions"),
    exclusions: jsonb("exclusions"),
    totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    depositAmount: decimal("deposit_amount", { precision: 12, scale: 2 }),
    terms: text("terms"),
    validUntil: timestamp("valid_until", { withTimezone: true }).notNull(),
    status: statusEnum('status').default('draft'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    provider_quotations_inquiry_idx: index('provider_quotations_inquiry_idx').on(table.inquiryId, table.status),
    provider_quotations_provider_idx: index('provider_quotations_provider_idx').on(table.providerId, table.status),
  })
);

export type ProviderQuotationInsert = typeof providerQuotationTable.$inferInsert;
export type ProviderQuotationSelect = typeof providerQuotationTable.$inferSelect;
