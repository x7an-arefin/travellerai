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

export const pricingTypeEnum = pgEnum('price_rules_pricing_type', ['per_person', 'per_adult', 'per_child', 'per_infant', 'per_senior', 'per_student', 'per_group', 'per_vehicle', 'per_room', 'per_hour', 'per_day']);

export const seasonTypeEnum = pgEnum('price_rules_season_type', ['standard', 'peak', 'off_peak', 'weekend', 'holiday', 'special_event']);

export const statusEnum = pgEnum('price_rules_status', ['active', 'inactive']);


export const priceRuleTable = pgTable(
  'price_rules',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").notNull(),
    departureId: uuid("departure_id"),
    pricingType: pricingTypeEnum('pricing_type').default('per_person'),
    tierMin: integer("tier_min"),
    tierMax: integer("tier_max"),
    seasonType: seasonTypeEnum('season_type').default('standard'),
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),
    price: decimal("price", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    price_rules_package_idx: index('price_rules_package_idx').on(table.packageId, table.status),
    price_rules_departure_idx: index('price_rules_departure_idx').on(table.departureId, table.status),
    price_rules_season_idx: index('price_rules_season_idx').on(table.seasonType, table.startDate, table.endDate),
  })
);

export type PriceRuleInsert = typeof priceRuleTable.$inferInsert;
export type PriceRuleSelect = typeof priceRuleTable.$inferSelect;
