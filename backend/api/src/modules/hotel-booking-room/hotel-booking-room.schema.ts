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


export const hotelBookingRoomTable = pgTable(
  'hotel_booking_rooms',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hotelBookingId: uuid("hotel_booking_id").notNull(),
    roomTypeId: uuid("room_type_id").notNull(),
    roomUnitId: uuid("room_unit_id"),
    ratePlanId: uuid("rate_plan_id"),
    guestName: varchar("guest_name", { length: 150 }).notNull(),
    guestEmail: varchar("guest_email", { length: 255 }),
    nightlyRate: decimal("nightly_rate", { precision: 12, scale: 2 }).notNull(),
    roomNumberAssigned: varchar("room_number_assigned", { length: 20 }),
    assignedAt: timestamp("assigned_at", { withTimezone: true }),
    assignedBy: uuid("assigned_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    hotel_booking_rooms_booking_idx: index('hotel_booking_rooms_booking_idx').on(table.hotelBookingId),
    hotel_booking_rooms_unit_idx: index('hotel_booking_rooms_unit_idx').on(table.roomUnitId),
  })
);

export type HotelBookingRoomInsert = typeof hotelBookingRoomTable.$inferInsert;
export type HotelBookingRoomSelect = typeof hotelBookingRoomTable.$inferSelect;
