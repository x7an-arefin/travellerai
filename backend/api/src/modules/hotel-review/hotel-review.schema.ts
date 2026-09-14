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


export const hotelReviewTable = pgTable(
  'hotel_reviews',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hotelBookingId: uuid("hotel_booking_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    travelerId: uuid("traveler_id"),
    overallRating: integer("overall_rating").notNull().default(5),
    cleanlinessRating: integer("cleanliness_rating").default(5),
    locationRating: integer("location_rating").default(5),
    serviceRating: integer("service_rating").default(5),
    facilitiesRating: integer("facilities_rating").default(5),
    valueRating: integer("value_rating").default(5),
    reviewTitle: varchar("review_title", { length: 200 }),
    reviewText: text("review_text"),
    photoUrls: jsonb("photo_urls"),
    isVerifiedStay: boolean("is_verified_stay").default(true),
    providerResponseText: text("provider_response_text"),
    providerRespondedAt: timestamp("provider_responded_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    hotel_reviews_property_idx: index('hotel_reviews_property_idx').on(table.propertyId),
    hotel_reviews_booking_idx: index('hotel_reviews_booking_idx').on(table.hotelBookingId),
  })
);

export type HotelReviewInsert = typeof hotelReviewTable.$inferInsert;
export type HotelReviewSelect = typeof hotelReviewTable.$inferSelect;
