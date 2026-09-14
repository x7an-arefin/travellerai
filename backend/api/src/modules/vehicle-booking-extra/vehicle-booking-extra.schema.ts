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

export const extraTypeEnum = pgEnum('vehicle_booking_extras_extra_type', ['child_seat_infant', 'child_seat_toddler', 'booster_seat', 'gps_navigator', 'roof_luggage_carrier', 'wifi_hotspot', 'additional_driver', 'satellite_phone']);


export const vehicleBookingExtraTable = pgTable(
  'vehicle_booking_extras',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleBookingId: uuid("vehicle_booking_id").notNull(),
    extraType: extraTypeEnum('extra_type').default('child_seat_infant'),
    name: varchar("name", { length: 100 }).notNull(),
    dailyRate: decimal("daily_rate", { precision: 8, scale: 2 }).notNull(),
    quantity: integer("quantity").default(1),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_booking_extras_booking_idx: index('vehicle_booking_extras_booking_idx').on(table.vehicleBookingId),
  })
);

export type VehicleBookingExtraInsert = typeof vehicleBookingExtraTable.$inferInsert;
export type VehicleBookingExtraSelect = typeof vehicleBookingExtraTable.$inferSelect;
