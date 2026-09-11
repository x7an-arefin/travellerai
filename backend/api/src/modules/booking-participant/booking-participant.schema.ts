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


export const bookingParticipantTable = pgTable(
  'booking_participants',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingId: uuid("booking_id").notNull(),
    fullName: varchar("full_name", { length: 200 }).notNull(),
    dateOfBirth: timestamp("date_of_birth", { withTimezone: true }),
    gender: varchar("gender", { length: 20 }),
    nationality: varchar("nationality", { length: 100 }),
    passportNumber: varchar("passport_number", { length: 50 }),
    passportExpiry: timestamp("passport_expiry", { withTimezone: true }),
    emergencyContact: jsonb("emergency_contact"),
    dietaryRequirements: varchar("dietary_requirements", { length: 500 }),
    accessibilityRequirements: varchar("accessibility_requirements", { length: 500 }),
    voluntaryMedicalNotes: text("voluntary_medical_notes"),
    isPrimaryContact: boolean("is_primary_contact").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    booking_participants_booking_idx: index('booking_participants_booking_idx').on(table.bookingId),
  })
);

export type BookingParticipantInsert = typeof bookingParticipantTable.$inferInsert;
export type BookingParticipantSelect = typeof bookingParticipantTable.$inferSelect;
