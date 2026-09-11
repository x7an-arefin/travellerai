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

export const statusEnum = pgEnum('trip_inquiries_status', ['open', 'quoted', 'accepted', 'booked', 'expired', 'closed']);


export const tripInquiryTable = pgTable(
  'trip_inquiries',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    travelerId: uuid("traveler_id"),
    destinationId: uuid("destination_id"),
    contactEmail: varchar("contact_email", { length: 255 }).notNull(),
    contactName: varchar("contact_name", { length: 200 }).notNull(),
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),
    travelerCount: integer("traveler_count"),
    estimatedBudget: decimal("estimated_budget", { precision: 12, scale: 2 }),
    budgetCurrency: varchar("budget_currency", { length: 3 }),
    preferences: jsonb("preferences"),
    specialRequests: text("special_requests"),
    status: statusEnum('status').default('open'),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    trip_inquiries_traveler_idx: index('trip_inquiries_traveler_idx').on(table.travelerId, table.status),
    trip_inquiries_status_idx: index('trip_inquiries_status_idx').on(table.status),
    trip_inquiries_destination_idx: index('trip_inquiries_destination_idx').on(table.destinationId, table.status),
  })
);

export type TripInquiryInsert = typeof tripInquiryTable.$inferInsert;
export type TripInquirySelect = typeof tripInquiryTable.$inferSelect;
