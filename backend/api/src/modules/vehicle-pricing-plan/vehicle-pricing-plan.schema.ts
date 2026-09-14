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

export const rentalModelEnum = pgEnum('vehicle_pricing_plans_rental_model', ['self_drive', 'with_driver', 'both']);

export const fuelPolicyCodeEnum = pgEnum('vehicle_pricing_plans_fuel_policy_code', ['full_to_full', 'same_to_same', 'pre_purchase_full', 'provider_filled']);


export const vehiclePricingPlanTable = pgTable(
  'vehicle_pricing_plans',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleId: uuid("vehicle_id").notNull(),
    rentalModel: rentalModelEnum('rental_model').default('self_drive'),
    baseHourlyRate: decimal("base_hourly_rate", { precision: 10, scale: 2 }),
    baseDailyRate: decimal("base_daily_rate", { precision: 10, scale: 2 }).notNull(),
    weeklyRate: decimal("weekly_rate", { precision: 10, scale: 2 }),
    depositAmount: decimal("deposit_amount", { precision: 10, scale: 2 }).default('200.00'),
    freeKmPerDay: integer("free_km_per_day").default(150),
    excessKmRate: decimal("excess_km_rate", { precision: 8, scale: 2 }).default('0.25'),
    fuelPolicyCode: fuelPolicyCodeEnum('fuel_policy_code').default('full_to_full'),
    isB2BExclusive: boolean("is_b2b_exclusive").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_pricing_plans_vehicle_idx: index('vehicle_pricing_plans_vehicle_idx').on(table.vehicleId),
  })
);

export type VehiclePricingPlanInsert = typeof vehiclePricingPlanTable.$inferInsert;
export type VehiclePricingPlanSelect = typeof vehiclePricingPlanTable.$inferSelect;
