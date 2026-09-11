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


export const itineraryItemTable = pgTable(
  'itinerary_items',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").notNull(),
    dayNumber: integer("day_number"),
    sequenceOrder: integer("sequence_order").notNull(),
    title: varchar("title", { length: 300 }).notNull(),
    description: text("description"),
    startTime: varchar("start_time", { length: 10 }),
    endTime: varchar("end_time", { length: 10 }),
    locationName: varchar("location_name", { length: 300 }),
    latitude: decimal("latitude", { precision: 10, scale: 7 }),
    longitude: decimal("longitude", { precision: 10, scale: 7 }),
    meals: jsonb("meals"),
    accommodation: jsonb("accommodation"),
    transport: jsonb("transport"),
    includedItems: jsonb("included_items"),
    optionalItems: jsonb("optional_items"),
    mediaUrls: jsonb("media_urls"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    itinerary_package_day_idx: index('itinerary_package_day_idx').on(table.packageId, table.dayNumber),
    itinerary_package_seq_idx: index('itinerary_package_seq_idx').on(table.packageId, table.sequenceOrder),
  })
);

export type ItineraryItemInsert = typeof itineraryItemTable.$inferInsert;
export type ItineraryItemSelect = typeof itineraryItemTable.$inferSelect;
