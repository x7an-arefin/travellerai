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

export const chargeTypeEnum = pgEnum('hotel_guest_folios_charge_type', ['minibar', 'room_service', 'laundry', 'late_checkout', 'early_checkin', 'spa', 'damage', 'parking', 'other']);


export const hotelGuestFolioTable = pgTable(
  'hotel_guest_folios',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    hotelBookingId: uuid("hotel_booking_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    roomNumber: varchar("room_number", { length: 20 }),
    chargeType: chargeTypeEnum('charge_type').default('room_service'),
    description: varchar("description", { length: 255 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default('USD'),
    postedBy: uuid("posted_by"),
    invoiceNumber: varchar("invoice_number", { length: 50 }),
    receiptUrl: varchar("receipt_url", { length: 500 }),
    isPaid: boolean("is_paid").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    hotel_guest_folios_booking_idx: index('hotel_guest_folios_booking_idx').on(table.hotelBookingId),
  })
);

export type HotelGuestFolioInsert = typeof hotelGuestFolioTable.$inferInsert;
export type HotelGuestFolioSelect = typeof hotelGuestFolioTable.$inferSelect;
