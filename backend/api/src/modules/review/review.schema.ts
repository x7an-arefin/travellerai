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

export const statusEnum = pgEnum('reviews_status', ['submitted', 'published', 'flagged', 'hidden', 'rejected']);


export const reviewTable = pgTable(
  'reviews',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull(),
    packageId: uuid("package_id").notNull(),
    providerId: uuid("provider_id").notNull(),
    travelerId: uuid("traveler_id").notNull(),
    overallRating: integer("overall_rating").notNull(),
    packageRating: integer("package_rating"),
    providerRating: integer("provider_rating"),
    guideRating: integer("guide_rating"),
    valueRating: integer("value_rating"),
    serviceRating: integer("service_rating"),
    title: varchar("title", { length: 300 }),
    content: text("content"),
    photos: jsonb("photos"),
    isVerifiedBooking: boolean("is_verified_booking").default(true),
    status: statusEnum('status').default('submitted'),
    moderationNotes: text("moderation_notes"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    reviews_package_status_idx: index('reviews_package_status_idx').on(table.packageId, table.status),
    reviews_provider_status_idx: index('reviews_provider_status_idx').on(table.providerId, table.status),
    reviews_traveler_idx: index('reviews_traveler_idx').on(table.travelerId),
    reviews_booking_unique_idx: uniqueIndex('reviews_booking_unique_idx').on(table.bookingId),
  })
);

export type ReviewInsert = typeof reviewTable.$inferInsert;
export type ReviewSelect = typeof reviewTable.$inferSelect;
