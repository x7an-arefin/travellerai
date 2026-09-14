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

export const propertyTypeEnum = pgEnum('hotel_properties_property_type', ['hotel', 'resort', 'boutique_hotel', 'eco_lodge', 'homestay_guesthouse', 'serviced_apartment', 'hostel', 'camp_glamping']);

export const statusEnum = pgEnum('hotel_properties_status', ['draft', 'pending_approval', 'active', 'suspended', 'inactive']);


export const hotelPropertyTable = pgTable(
  'hotel_properties',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    destinationId: uuid("destination_id"),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 250 }).unique().notNull(),
    propertyType: propertyTypeEnum('property_type').default('hotel'),
    starRating: integer("star_rating").default(3),
    checkInTime: varchar("check_in_time", { length: 10 }).default('14:00'),
    checkOutTime: varchar("check_out_time", { length: 10 }).default('11:00'),
    address: varchar("address", { length: 500 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }),
    latitude: decimal("latitude", { precision: 10, scale: 7 }),
    longitude: decimal("longitude", { precision: 10, scale: 7 }),
    phone: varchar("phone", { length: 30 }),
    email: varchar("email", { length: 255 }),
    description: text("description"),
    coverImageUrl: varchar("cover_image_url", { length: 500 }),
    galleryUrls: jsonb("gallery_urls"),
    taxId: varchar("tax_id", { length: 100 }),
    businessRegistrationNumber: varchar("business_registration_number", { length: 100 }),
    status: statusEnum('status').default('draft'),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    hotel_properties_provider_idx: index('hotel_properties_provider_idx').on(table.providerId),
    hotel_properties_destination_idx: index('hotel_properties_destination_idx').on(table.destinationId),
    hotel_properties_status_idx: index('hotel_properties_status_idx').on(table.status),
  })
);

export type HotelPropertyInsert = typeof hotelPropertyTable.$inferInsert;
export type HotelPropertySelect = typeof hotelPropertyTable.$inferSelect;
