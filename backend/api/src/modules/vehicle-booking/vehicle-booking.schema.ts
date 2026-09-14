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

export const rentalModelEnum = pgEnum('vehicle_bookings_rental_model', ['self_drive', 'with_driver']);

export const serviceTypeEnum = pgEnum('vehicle_bookings_service_type', ['self_drive_rental', 'airport_transfer_arrival', 'airport_transfer_departure', 'intercity_transfer', 'hourly_city_charter', 'full_day_tour', 'multi_day_outstation']);

export const bookingStatusEnum = pgEnum('vehicle_bookings_booking_status', ['pending_payment', 'confirmed', 'assigned', 'en_route_to_pickup', 'arrived_at_pickup', 'in_progress', 'returned', 'completed', 'cancelled']);

export const depositHoldStatusEnum = pgEnum('vehicle_bookings_deposit_hold_status', ['none', 'authorized', 'captured', 'partial_released', 'fully_released', 'forfeited']);

export const paymentStatusEnum = pgEnum('vehicle_bookings_payment_status', ['pending', 'authorized', 'paid', 'refunded']);


export const vehicleBookingTable = pgTable(
  'vehicle_bookings',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingReference: varchar("booking_reference", { length: 25 }).unique().notNull(),
    travelerId: uuid("traveler_id"),
    providerId: uuid("provider_id").notNull(),
    vehicleId: uuid("vehicle_id"),
    driverId: uuid("driver_id"),
    rentalModel: rentalModelEnum('rental_model').default('self_drive'),
    serviceType: serviceTypeEnum('service_type').default('self_drive_rental'),
    pickupDateTime: timestamp("pickup_date_time", { withTimezone: true }).notNull(),
    returnDateTime: timestamp("return_date_time", { withTimezone: true }).notNull(),
    pickupLocationAddress: varchar("pickup_location_address", { length: 300 }).notNull(),
    pickupLatitude: decimal("pickup_latitude", { precision: 10, scale: 7 }),
    pickupLongitude: decimal("pickup_longitude", { precision: 10, scale: 7 }),
    dropoffLocationAddress: varchar("dropoff_location_address", { length: 300 }),
    dropoffLatitude: decimal("dropoff_latitude", { precision: 10, scale: 7 }),
    dropoffLongitude: decimal("dropoff_longitude", { precision: 10, scale: 7 }),
    flightNumber: varchar("flight_number", { length: 20 }),
    flightEta: varchar("flight_eta", { length: 20 }),
    passengerCount: integer("passenger_count").default(1),
    bookingStatus: bookingStatusEnum('booking_status').default('pending_payment'),
    baseRentalAmount: decimal("base_rental_amount", { precision: 12, scale: 2 }).notNull(),
    extrasAmount: decimal("extras_amount", { precision: 10, scale: 2 }).default('0.00'),
    protectionPlanAmount: decimal("protection_plan_amount", { precision: 10, scale: 2 }).default('0.00'),
    driverAllowanceAmount: decimal("driver_allowance_amount", { precision: 10, scale: 2 }).default('0.00'),
    taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default('0.00'),
    totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
    securityDepositAmount: decimal("security_deposit_amount", { precision: 10, scale: 2 }).default('0.00'),
    depositHoldStatus: depositHoldStatusEnum('deposit_hold_status').default('none'),
    commissionAmount: decimal("commission_amount", { precision: 10, scale: 2 }).default('0.00'),
    netProviderAmount: decimal("net_provider_amount", { precision: 12, scale: 2 }).default('0.00'),
    paymentStatus: paymentStatusEnum('payment_status').default('pending'),
    otpCode: varchar("otp_code", { length: 6 }),
    qrCode: varchar("qr_code", { length: 500 }),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    vehicle_bookings_ref_idx: index('vehicle_bookings_ref_idx').on(table.bookingReference),
    vehicle_bookings_provider_idx: index('vehicle_bookings_provider_idx').on(table.providerId),
    vehicle_bookings_status_idx: index('vehicle_bookings_status_idx').on(table.bookingStatus),
  })
);

export type VehicleBookingInsert = typeof vehicleBookingTable.$inferInsert;
export type VehicleBookingSelect = typeof vehicleBookingTable.$inferSelect;
