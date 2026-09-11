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

export const discountTypeEnum = pgEnum('coupons_discount_type', ['percentage', 'fixed']);

export const funderEnum = pgEnum('coupons_funder', ['marketplace', 'provider', 'shared']);

export const statusEnum = pgEnum('coupons_status', ['active', 'inactive', 'expired']);


export const couponTable = pgTable(
  'coupons',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 50 }).unique().notNull(),
    discountType: discountTypeEnum('discount_type').default('percentage'),
    discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }),
    minBookingValue: decimal("min_booking_value", { precision: 10, scale: 2 }),
    maxDiscount: decimal("max_discount", { precision: 10, scale: 2 }),
    providerId: uuid("provider_id"),
    startsAt: timestamp("starts_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    maxUses: integer("max_uses"),
    usedCount: integer("used_count").default(0),
    maxUsesPerCustomer: integer("max_uses_per_customer"),
    isFirstBookingOnly: boolean("is_first_booking_only").default(false),
    funder: funderEnum('funder').default('marketplace'),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    coupons_code_unique_idx: uniqueIndex('coupons_code_unique_idx').on(table.code),
    coupons_status_expires_idx: index('coupons_status_expires_idx').on(table.status, table.expiresAt),
  })
);

export type CouponInsert = typeof couponTable.$inferInsert;
export type CouponSelect = typeof couponTable.$inferSelect;
