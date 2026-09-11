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

export const bookingStatusEnum = pgEnum('bookings_booking_status', ['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']);

export const checkinStatusEnum = pgEnum('bookings_checkin_status', ['pending', 'checked_in', 'no_show']);


export const bookingTable = pgTable(
  'bookings',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingReference: varchar("booking_reference", { length: 20 }).unique().notNull(),
    travelerId: uuid("traveler_id"),
    packageId: uuid("package_id").notNull(),
    departureId: uuid("departure_id"),
    guestEmail: varchar("guest_email", { length: 255 }),
    guestName: varchar("guest_name", { length: 200 }),
    participantCount: integer("participant_count").notNull(),
    bookingStatus: bookingStatusEnum('booking_status').default('draft'),
    totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
    baseAmount: decimal("base_amount", { precision: 12, scale: 2 }),
    addonAmount: decimal("addon_amount", { precision: 12, scale: 2 }),
    discountAmount: decimal("discount_amount", { precision: 12, scale: 2 }),
    taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }),
    serviceFeeAmount: decimal("service_fee_amount", { precision: 12, scale: 2 }),
    depositAmount: decimal("deposit_amount", { precision: 12, scale: 2 }),
    paidAmount: decimal("paid_amount", { precision: 12, scale: 2 }),
    balanceDue: decimal("balance_due", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).notNull(),
    displayCurrency: varchar("display_currency", { length: 3 }),
    exchangeRate: decimal("exchange_rate", { precision: 18, scale: 8 }),
    couponCode: varchar("coupon_code", { length: 50 }),
    walletCreditUsed: decimal("wallet_credit_used", { precision: 12, scale: 2 }),
    contactName: varchar("contact_name", { length: 200 }).notNull(),
    contactEmail: varchar("contact_email", { length: 255 }).notNull(),
    contactPhone: varchar("contact_phone", { length: 30 }),
    pickupLocation: varchar("pickup_location", { length: 500 }),
    specialRequests: text("special_requests"),
    qrCode: varchar("qr_code", { length: 500 }),
    voucherUrl: varchar("voucher_url", { length: 500 }),
    checkinStatus: checkinStatusEnum('checkin_status').default('pending'),
    checkinTime: timestamp("checkin_time", { withTimezone: true }),
    inventoryLockedUntil: timestamp("inventory_locked_until", { withTimezone: true }),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    bookings_reference_unique_idx: uniqueIndex('bookings_reference_unique_idx').on(table.bookingReference),
    bookings_traveler_status_idx: index('bookings_traveler_status_idx').on(table.travelerId, table.bookingStatus),
    bookings_package_idx: index('bookings_package_idx').on(table.packageId, table.bookingStatus),
    bookings_departure_idx: index('bookings_departure_idx').on(table.departureId, table.bookingStatus),
    bookings_status_idx: index('bookings_status_idx').on(table.bookingStatus),
  })
);

export type BookingInsert = typeof bookingTable.$inferInsert;
export type BookingSelect = typeof bookingTable.$inferSelect;
