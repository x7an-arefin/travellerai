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

export const productTypeEnum = pgEnum('packages_product_type', ['fixed_tour', 'flexible_tour', 'private_tour', 'group_tour', 'activity', 'day_trip', 'multi_day_package', 'guided_city_tour', 'adventure_experience', 'cruise_boat', 'transfer_service', 'transport_rental', 'accommodation_package', 'custom_trip', 'event_package', 'ticket_pass', 'travel_product', 'package_addon']);

export const difficultyLevelEnum = pgEnum('packages_difficulty_level', ['easy', 'moderate', 'challenging', 'extreme']);

export const confirmationTypeEnum = pgEnum('packages_confirmation_type', ['instant', 'request_to_book']);

export const cancellationPolicyEnum = pgEnum('packages_cancellation_policy', ['flexible', 'moderate', 'strict', 'non_refundable']);

export const statusEnum = pgEnum('packages_status', ['draft', 'submitted', 'approved', 'published', 'unpublished', 'rejected', 'archived', 'suspended', 'expired']);


export const packageTable = pgTable(
  'packages',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    categoryId: uuid("category_id"),
    destinationId: uuid("destination_id"),
    title: varchar("title", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 350 }).unique().notNull(),
    shortDescription: varchar("short_description", { length: 500 }),
    description: text("description"),
    productType: productTypeEnum('product_type').default('fixed_tour'),
    durationHours: integer("duration_hours"),
    durationDays: integer("duration_days"),
    minParticipants: integer("min_participants"),
    maxParticipants: integer("max_participants"),
    minAge: integer("min_age"),
    maxAge: integer("max_age"),
    difficultyLevel: difficultyLevelEnum('difficulty_level').default('easy'),
    confirmationType: confirmationTypeEnum('confirmation_type').default('instant'),
    cancellationPolicy: cancellationPolicyEnum('cancellation_policy').default('moderate'),
    cancellationPolicyDetails: text("cancellation_policy_details"),
    refundPolicy: text("refund_policy"),
    terms: text("terms"),
    basePrice: decimal("base_price", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).notNull(),
    featuredImage: varchar("featured_image", { length: 500 }),
    gallery: jsonb("gallery"),
    videoUrl: varchar("video_url", { length: 500 }),
    brochureUrl: varchar("brochure_url", { length: 500 }),
    meetingPoint: text("meeting_point"),
    meetingLatitude: decimal("meeting_latitude", { precision: 10, scale: 7 }),
    meetingLongitude: decimal("meeting_longitude", { precision: 10, scale: 7 }),
    departureLocation: varchar("departure_location", { length: 400 }),
    returnLocation: varchar("return_location", { length: 400 }),
    inclusions: jsonb("inclusions"),
    exclusions: jsonb("exclusions"),
    amenities: jsonb("amenities"),
    languages: jsonb("languages"),
    accessibilityInfo: text("accessibility_info"),
    physicalRequirements: text("physical_requirements"),
    tags: jsonb("tags"),
    searchKeywords: text("search_keywords"),
    isFeatured: boolean("is_featured").default(false),
    rating: decimal("rating", { precision: 3, scale: 2 }),
    reviewCount: integer("review_count").default(0),
    totalBookings: integer("total_bookings").default(0),
    status: statusEnum('status').default('draft'),
    rejectionReason: text("rejection_reason"),
    moderationNotes: text("moderation_notes"),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    packages_provider_status_idx: index('packages_provider_status_idx').on(table.providerId, table.status),
    packages_slug_unique_idx: uniqueIndex('packages_slug_unique_idx').on(table.slug),
    packages_destination_idx: index('packages_destination_idx').on(table.destinationId, table.status),
    packages_category_idx: index('packages_category_idx').on(table.categoryId, table.status),
    packages_featured_idx: index('packages_featured_idx').on(table.isFeatured, table.status),
    packages_type_idx: index('packages_type_idx').on(table.productType, table.status),
  })
);

export type PackageInsert = typeof packageTable.$inferInsert;
export type PackageSelect = typeof packageTable.$inferSelect;
