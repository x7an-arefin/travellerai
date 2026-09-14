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

export const planCodeEnum = pgEnum('vehicle_protection_plans_plan_code', ['basic_liability', 'collision_damage_waiver', 'loss_damage_waiver', 'full_damage_waiver', 'roadside_assistance']);


export const vehicleProtectionPlanTable = pgTable(
  'vehicle_protection_plans',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    planCode: planCodeEnum('plan_code').default('collision_damage_waiver'),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    dailyRate: decimal("daily_rate", { precision: 8, scale: 2 }).notNull(),
    collisionDeductibleAmount: decimal("collision_deductible_amount", { precision: 10, scale: 2 }).default('200.00'),
    theftDeductibleAmount: decimal("theft_deductible_amount", { precision: 10, scale: 2 }).default('0.00'),
    glassTireCovered: boolean("glass_tire_covered").default(false),
    roadsideAssistanceCovered: boolean("roadside_assistance_covered").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
  })
);

export type VehicleProtectionPlanInsert = typeof vehicleProtectionPlanTable.$inferInsert;
export type VehicleProtectionPlanSelect = typeof vehicleProtectionPlanTable.$inferSelect;
