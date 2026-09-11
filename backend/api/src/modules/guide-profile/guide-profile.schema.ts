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

export const statusEnum = pgEnum('guide_profiles_status', ['active', 'inactive', 'suspended']);


export const guideProfileTable = pgTable(
  'guide_profiles',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    userId: uuid("user_id"),
    name: varchar("name", { length: 200 }).notNull(),
    photoUrl: varchar("photo_url", { length: 500 }),
    bio: text("bio"),
    languages: jsonb("languages"),
    certifications: jsonb("certifications"),
    specialties: jsonb("specialties"),
    rating: decimal("rating", { precision: 3, scale: 2 }),
    emergencyContact: jsonb("emergency_contact"),
    isAvailable: boolean("is_available").default(true),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    guide_profiles_provider_idx: index('guide_profiles_provider_idx').on(table.providerId, table.status),
    guide_profiles_user_idx: index('guide_profiles_user_idx').on(table.userId),
  })
);

export type GuideProfileInsert = typeof guideProfileTable.$inferInsert;
export type GuideProfileSelect = typeof guideProfileTable.$inferSelect;
