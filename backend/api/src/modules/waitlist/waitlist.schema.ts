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

export const statusEnum = pgEnum('waitlists_status', ['waiting', 'offered', 'booked', 'expired', 'cancelled']);


export const waitlistTable = pgTable(
  'waitlists',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    departureId: uuid("departure_id").notNull(),
    userId: uuid("user_id"),
    travelerEmail: varchar("traveler_email", { length: 255 }).notNull(),
    travelerName: varchar("traveler_name", { length: 200 }).notNull(),
    requestedSeats: integer("requested_seats").notNull(),
    status: statusEnum('status').default('waiting'),
    offerExpiresAt: timestamp("offer_expires_at", { withTimezone: true }),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    waitlist_departure_idx: index('waitlist_departure_idx').on(table.departureId, table.status),
    waitlist_user_idx: index('waitlist_user_idx').on(table.userId, table.status),
  })
);

export type WaitlistInsert = typeof waitlistTable.$inferInsert;
export type WaitlistSelect = typeof waitlistTable.$inferSelect;
