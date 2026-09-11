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

export const statusEnum = pgEnum('departures_status', ['available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed']);


export const departureTable = pgTable(
  'departures',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").notNull(),
    departureCode: varchar("departure_code", { length: 50 }).notNull(),
    startDatetime: timestamp("start_datetime", { withTimezone: true }).notNull(),
    endDatetime: timestamp("end_datetime", { withTimezone: true }),
    capacity: integer("capacity").notNull(),
    bookedCount: integer("booked_count").default(0),
    availableCount: integer("available_count"),
    minParticipants: integer("min_participants"),
    assignedGuideId: uuid("assigned_guide_id"),
    priceOverride: decimal("price_override", { precision: 12, scale: 2 }),
    bookingCutoffHours: integer("booking_cutoff_hours"),
    meetingPoint: text("meeting_point"),
    internalNotes: text("internal_notes"),
    status: statusEnum('status').default('available'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    departures_package_status_idx: index('departures_package_status_idx').on(table.packageId, table.status),
    departures_start_date_idx: index('departures_start_date_idx').on(table.startDatetime, table.status),
    departures_code_idx: index('departures_code_idx').on(table.departureCode),
  })
);

export type DepartureInsert = typeof departureTable.$inferInsert;
export type DepartureSelect = typeof departureTable.$inferSelect;
