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

export const providerTypeEnum = pgEnum('providers_provider_type', ['agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host']);

export const kycStatusEnum = pgEnum('providers_kyc_status', ['not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired']);

export const approvalStatusEnum = pgEnum('providers_approval_status', ['pending', 'approved', 'rejected', 'suspended']);

export const riskLevelEnum = pgEnum('providers_risk_level', ['low', 'medium', 'high', 'critical']);


export const providerTable = pgTable(
  'providers',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id").notNull(),
    legalName: varchar("legal_name", { length: 255 }).notNull(),
    displayName: varchar("display_name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 250 }).unique().notNull(),
    providerType: providerTypeEnum('provider_type').default('tour_operator'),
    registrationNumber: varchar("registration_number", { length: 100 }),
    taxId: varchar("tax_id", { length: 100 }),
    country: varchar("country", { length: 100 }).notNull(),
    address: text("address"),
    contactEmail: varchar("contact_email", { length: 255 }).notNull(),
    contactPhone: varchar("contact_phone", { length: 30 }),
    website: varchar("website", { length: 500 }),
    logoUrl: varchar("logo_url", { length: 500 }),
    coverImage: varchar("cover_image", { length: 500 }),
    description: text("description"),
    languages: jsonb("languages"),
    operatingDestinations: jsonb("operating_destinations"),
    socialLinks: jsonb("social_links"),
    certifications: jsonb("certifications"),
    commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }),
    kycStatus: kycStatusEnum('kyc_status').default('not_submitted'),
    approvalStatus: approvalStatusEnum('approval_status').default('pending'),
    rating: decimal("rating", { precision: 3, scale: 2 }),
    totalBookings: integer("total_bookings").default(0),
    verifiedBadge: boolean("verified_badge").default(false),
    isWithdrawalRestricted: boolean("is_withdrawal_restricted").default(false),
    riskLevel: riskLevelEnum('risk_level').default('low'),
    internalNotes: text("internal_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    providers_owner_idx: index('providers_owner_idx').on(table.ownerId),
    providers_slug_unique_idx: uniqueIndex('providers_slug_unique_idx').on(table.slug),
    providers_approval_kyc_idx: index('providers_approval_kyc_idx').on(table.approvalStatus, table.kycStatus),
    providers_type_country_idx: index('providers_type_country_idx').on(table.providerType, table.country),
  })
);

export type ProviderInsert = typeof providerTable.$inferInsert;
export type ProviderSelect = typeof providerTable.$inferSelect;
