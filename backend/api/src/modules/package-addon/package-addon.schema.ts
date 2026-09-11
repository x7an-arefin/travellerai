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

export const pricingTypeEnum = pgEnum('package_addons_pricing_type', ['per_person', 'per_booking']);

export const statusEnum = pgEnum('package_addons_status', ['active', 'inactive']);


export const packageAddonTable = pgTable(
  'package_addons',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    pricingType: pricingTypeEnum('pricing_type').default('per_person'),
    maxQuantity: integer("max_quantity"),
    isRequired: boolean("is_required").default(false),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    package_addons_package_idx: index('package_addons_package_idx').on(table.packageId, table.status),
  })
);

export type PackageAddonInsert = typeof packageAddonTable.$inferInsert;
export type PackageAddonSelect = typeof packageAddonTable.$inferSelect;
