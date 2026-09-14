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

export const bookingStatusEnum = pgEnum('hotel_bookings_booking_status', ['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'refund_pending', 'refunded']);

export const paymentStatusEnum = pgEnum('hotel_bookings_payment_status', ['pending', 'authorized', 'partially_paid', 'paid', 'refunded']);


export const hotelBookingTable = pgTable(
  'hotel_bookings',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingReference: varchar("booking_reference", { length: 25 }).unique().notNull(),
    travelerId: uuid("traveler_id"),
    propertyId: uuid("property_id").notNull(),
    checkInDate: varchar("check_in_date", { length: 10 }).notNull(),
    checkOutDate: varchar("check_out_date", { length: 10 }).notNull(),
    totalNights: integer("total_nights").notNull().default(1),
    totalRooms: integer("total_rooms").notNull().default(1),
    totalAdults: integer("total_adults").notNull().default(2),
    totalChildren: integer("total_children").default(0),
    bookingStatus: bookingStatusEnum('booking_status').default('pending_payment'),
    totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
    roomChargesAmount: decimal("room_charges_amount", { precision: 12, scale: 2 }).notNull(),
    incidentalChargesAmount: decimal("incidental_charges_amount", { precision: 12, scale: 2 }).default('0.00'),
    taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default('0.00'),
    commissionAmount: decimal("commission_amount", { precision: 12, scale: 2 }).default('0.00'),
    netProviderAmount: decimal("net_provider_amount", { precision: 12, scale: 2 }).default('0.00'),
    paymentStatus: paymentStatusEnum('payment_status').default('pending'),
    paymentMethod: varchar("payment_method", { length: 50 }),
    depositAmount: decimal("deposit_amount", { precision: 12, scale: 2 }).default('0.00'),
    specialRequests: text("special_requests"),
    estimatedArrivalTime: varchar("estimated_arrival_time", { length: 10 }),
    contactName: varchar("contact_name", { length: 150 }).notNull(),
    contactEmail: varchar("contact_email", { length: 255 }).notNull(),
    contactPhone: varchar("contact_phone", { length: 30 }),
    confirmationQrCode: varchar("confirmation_qr_code", { length: 500 }),
    checkedInAt: timestamp("checked_in_at", { withTimezone: true }),
    checkedOutAt: timestamp("checked_out_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    hotel_bookings_property_idx: index('hotel_bookings_property_idx').on(table.propertyId),
    hotel_bookings_ref_idx: index('hotel_bookings_ref_idx').on(table.bookingReference),
    hotel_bookings_status_idx: index('hotel_bookings_status_idx').on(table.bookingStatus),
  })
);

export type HotelBookingInsert = typeof hotelBookingTable.$inferInsert;
export type HotelBookingSelect = typeof hotelBookingTable.$inferSelect;
