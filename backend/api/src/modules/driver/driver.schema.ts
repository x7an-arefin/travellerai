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

export const dutyStatusEnum = pgEnum('drivers_duty_status', ['available', 'on_trip', 'off_duty', 'suspended']);


export const driverTable = pgTable(
  'drivers',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    userId: uuid("user_id"),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 30 }).notNull(),
    email: varchar("email", { length: 255 }),
    licenseNumber: varchar("license_number", { length: 50 }).notNull(),
    licenseCategory: varchar("license_category", { length: 50 }).default('Commercial'),
    licenseExpiryDate: varchar("license_expiry_date", { length: 10 }).notNull(),
    licensePhotoFrontUrl: varchar("license_photo_front_url", { length: 500 }),
    licensePhotoBackUrl: varchar("license_photo_back_url", { length: 500 }),
    driverPhotoUrl: varchar("driver_photo_url", { length: 500 }),
    yearsOfExperience: integer("years_of_experience").default(3),
    assignedVehicleId: uuid("assigned_vehicle_id"),
    dutyStatus: dutyStatusEnum('duty_status').default('available'),
    currentLatitude: decimal("current_latitude", { precision: 10, scale: 7 }),
    currentLongitude: decimal("current_longitude", { precision: 10, scale: 7 }),
    overallRating: decimal("overall_rating", { precision: 3, scale: 2 }).default('5.00'),
    completedTripsCount: integer("completed_trips_count").default(0),
    isVerified: boolean("is_verified").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    drivers_provider_idx: index('drivers_provider_idx').on(table.providerId),
    drivers_duty_idx: index('drivers_duty_idx').on(table.dutyStatus),
  })
);

export type DriverInsert = typeof driverTable.$inferInsert;
export type DriverSelect = typeof driverTable.$inferSelect;
