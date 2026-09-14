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

export const categoryEnum = pgEnum('vehicles_category', ['four_wheeler', 'two_wheeler', 'three_wheeler_cng']);

export const subCategoryEnum = pgEnum('vehicles_sub_category', ['economy_sedan', 'compact_hatchback', 'midsize_sedan', 'premium_sedan', 'compact_suv', 'fullsize_suv_4x4', 'luxury_suv', 'minivan', 'minibus', 'tourist_microbus', 'tourist_coach', 'commuter_scooter', 'premium_scooter', 'adventure_touring_bike', 'electric_scooter', 'electric_bicycle', 'cng_auto_rickshaw', 'tuktuk_rickshaw', 'electric_easy_bike']);

export const transmissionEnum = pgEnum('vehicles_transmission', ['automatic', 'manual', 'direct_drive']);

export const fuelTypeEnum = pgEnum('vehicles_fuel_type', ['petrol', 'octane', 'diesel', 'hybrid_petrol', 'hybrid_diesel', 'full_electric', 'cng', 'lpg']);

export const driveTrainEnum = pgEnum('vehicles_drive_train', ['fwd', 'rwd', 'awd_4x4']);

export const airConditioningEnum = pgEnum('vehicles_air_conditioning', ['climate_control', 'manual_ac', 'none']);

export const activeStatusEnum = pgEnum('vehicles_active_status', ['active', 'maintenance', 'compliance_hold', 'retired', 'inactive']);


export const vehicleTable = pgTable(
  'vehicles',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    registrationNumber: varchar("registration_number", { length: 50 }).unique().notNull(),
    vinNumber: varchar("vin_number", { length: 50 }),
    make: varchar("make", { length: 50 }).notNull(),
    model: varchar("model", { length: 50 }).notNull(),
    year: integer("year").notNull(),
    category: categoryEnum('category').default('four_wheeler'),
    subCategory: subCategoryEnum('sub_category').default('economy_sedan'),
    seatingCapacity: integer("seating_capacity").notNull().default(5),
    luggageCapacityLarge: integer("luggage_capacity_large").default(2),
    luggageCapacitySmall: integer("luggage_capacity_small").default(2),
    transmission: transmissionEnum('transmission').default('automatic'),
    fuelType: fuelTypeEnum('fuel_type').default('petrol'),
    driveTrain: driveTrainEnum('drive_train').default('fwd'),
    color: varchar("color", { length: 40 }),
    airConditioning: airConditioningEnum('air_conditioning').default('climate_control'),
    engineDisplacementCc: integer("engine_displacement_cc"),
    currentOdometerKm: integer("current_odometer_km").default(0),
    currentFuelLevelPercent: integer("current_fuel_level_percent").default(100),
    cngCylinderTestExpiry: varchar("cng_cylinder_test_expiry", { length: 10 }),
    activeStatus: activeStatusEnum('active_status').default('active'),
    isAvailableForRental: boolean("is_available_for_rental").default(true),
    isAvailableWithDriver: boolean("is_available_with_driver").default(true),
    currentLocationAddress: varchar("current_location_address", { length: 300 }),
    latitude: decimal("latitude", { precision: 10, scale: 7 }),
    longitude: decimal("longitude", { precision: 10, scale: 7 }),
    photos: jsonb("photos"),
    features: jsonb("features"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    vehicles_provider_idx: index('vehicles_provider_idx').on(table.providerId),
    vehicles_category_idx: index('vehicles_category_idx').on(table.category),
    vehicles_status_idx: index('vehicles_status_idx').on(table.activeStatus),
  })
);

export type VehicleInsert = typeof vehicleTable.$inferInsert;
export type VehicleSelect = typeof vehicleTable.$inferSelect;
