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


export const vehicleReviewTable = pgTable(
  'vehicle_reviews',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleBookingId: uuid("vehicle_booking_id").notNull(),
    vehicleId: uuid("vehicle_id"),
    driverId: uuid("driver_id"),
    travelerId: uuid("traveler_id"),
    overallRating: integer("overall_rating").notNull().default(5),
    vehicleConditionRating: integer("vehicle_condition_rating").default(5),
    driverProfessionalismRating: integer("driver_professionalism_rating").default(5),
    punctualityRating: integer("punctuality_rating").default(5),
    valueRating: integer("value_rating").default(5),
    reviewText: text("review_text"),
    photoUrls: jsonb("photo_urls"),
    isVerifiedRental: boolean("is_verified_rental").default(true),
    providerResponseText: text("provider_response_text"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_reviews_vehicle_idx: index('vehicle_reviews_vehicle_idx').on(table.vehicleId),
    vehicle_reviews_driver_idx: index('vehicle_reviews_driver_idx').on(table.driverId),
  })
);

export type VehicleReviewInsert = typeof vehicleReviewTable.$inferInsert;
export type VehicleReviewSelect = typeof vehicleReviewTable.$inferSelect;
