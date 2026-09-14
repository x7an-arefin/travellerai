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

export const vehicleCategoryEnum = pgEnum('vehicle_transfer_routes_vehicle_category', ['economy_sedan', 'compact_suv', 'fullsize_suv_4x4', 'minivan', 'tourist_microbus', 'cng_auto_rickshaw']);


export const vehicleTransferRouteTable = pgTable(
  'vehicle_transfer_routes',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    originName: varchar("origin_name", { length: 150 }).notNull(),
    originCoordinates: varchar("origin_coordinates", { length: 50 }),
    destinationName: varchar("destination_name", { length: 150 }).notNull(),
    destinationCoordinates: varchar("destination_coordinates", { length: 50 }),
    distanceKm: decimal("distance_km", { precision: 8, scale: 2 }),
    estimatedDurationMinutes: integer("estimated_duration_minutes"),
    vehicleCategory: vehicleCategoryEnum('vehicle_category').default('economy_sedan'),
    fixedFareAmount: decimal("fixed_fare_amount", { precision: 10, scale: 2 }).notNull(),
    driverAllowanceAmount: decimal("driver_allowance_amount", { precision: 10, scale: 2 }).default('0.00'),
    tollIncluded: boolean("toll_included").default(true),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_transfer_routes_provider_idx: index('vehicle_transfer_routes_provider_idx').on(table.providerId),
  })
);

export type VehicleTransferRouteInsert = typeof vehicleTransferRouteTable.$inferInsert;
export type VehicleTransferRouteSelect = typeof vehicleTransferRouteTable.$inferSelect;
