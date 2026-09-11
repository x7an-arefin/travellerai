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

export const statusEnum = pgEnum('destinations_status', ['active', 'inactive', 'draft']);


export const destinationTable = pgTable(
  'destinations',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 250 }).unique().notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    countryCode: varchar("country_code", { length: 5 }),
    stateRegion: varchar("state_region", { length: 150 }),
    description: text("description"),
    travelGuide: text("travel_guide"),
    coverImage: varchar("cover_image", { length: 500 }),
    gallery: jsonb("gallery"),
    latitude: decimal("latitude", { precision: 10, scale: 7 }),
    longitude: decimal("longitude", { precision: 10, scale: 7 }),
    weatherInfo: jsonb("weather_info"),
    visaInfo: text("visa_info"),
    safetyInfo: text("safety_info"),
    isFeatured: boolean("is_featured").default(false),
    sortOrder: integer("sort_order"),
    status: statusEnum('status').default('draft'),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    destinations_slug_unique_idx: uniqueIndex('destinations_slug_unique_idx').on(table.slug),
    destinations_country_status_idx: index('destinations_country_status_idx').on(table.country, table.status),
    destinations_featured_idx: index('destinations_featured_idx').on(table.isFeatured, table.status),
  })
);

export type DestinationInsert = typeof destinationTable.$inferInsert;
export type DestinationSelect = typeof destinationTable.$inferSelect;
