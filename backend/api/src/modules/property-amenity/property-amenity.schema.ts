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

export const categoryEnum = pgEnum('property_amenities_category', ['general', 'room', 'wellness_spa', 'dining', 'business', 'accessibility', 'family_kids', 'outdoor_sports']);

export const chargeFrequencyEnum = pgEnum('property_amenities_charge_frequency', ['one_time', 'per_night', 'per_stay', 'per_hour']);


export const propertyAmenityTable = pgTable(
  'property_amenities',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id").notNull(),
    category: categoryEnum('category').default('general'),
    amenityCode: varchar("amenity_code", { length: 50 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    isFree: boolean("is_free").default(true),
    chargeAmount: decimal("charge_amount", { precision: 10, scale: 2 }),
    chargeFrequency: chargeFrequencyEnum('charge_frequency').default('per_stay'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    property_amenities_property_idx: index('property_amenities_property_idx').on(table.propertyId),
  })
);

export type PropertyAmenityInsert = typeof propertyAmenityTable.$inferInsert;
export type PropertyAmenitySelect = typeof propertyAmenityTable.$inferSelect;
