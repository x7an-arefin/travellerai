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

export const mealPlanTypeEnum = pgEnum('rate_plans_meal_plan_type', ['ep_room_only', 'cp_breakfast', 'map_half_board', 'ap_full_board', 'all_inclusive']);

export const cancellationPolicyTypeEnum = pgEnum('rate_plans_cancellation_policy_type', ['flexible_24h', 'moderate_5d', 'strict_14d', 'non_refundable']);


export const ratePlanTable = pgTable(
  'rate_plans',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roomTypeId: uuid("room_type_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    planCode: varchar("plan_code", { length: 50 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    mealPlanType: mealPlanTypeEnum('meal_plan_type').default('cp_breakfast'),
    cancellationPolicyType: cancellationPolicyTypeEnum('cancellation_policy_type').default('flexible_24h'),
    cancellationCutoffHours: integer("cancellation_cutoff_hours").default(24),
    cancellationPenaltyPercent: integer("cancellation_penalty_percent").default(0),
    isRefundable: boolean("is_refundable").default(true),
    minimumStayNights: integer("minimum_stay_nights").default(1),
    maximumStayNights: integer("maximum_stay_nights").default(30),
    basePriceMultiplier: decimal("base_price_multiplier", { precision: 5, scale: 4 }).default('1.0000'),
    fixedSurcharge: decimal("fixed_surcharge", { precision: 10, scale: 2 }).default('0.00'),
    isB2BExclusive: boolean("is_b2b_exclusive").default(false),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    rate_plans_room_type_idx: index('rate_plans_room_type_idx').on(table.roomTypeId),
    rate_plans_property_idx: index('rate_plans_property_idx').on(table.propertyId),
  })
);

export type RatePlanInsert = typeof ratePlanTable.$inferInsert;
export type RatePlanSelect = typeof ratePlanTable.$inferSelect;
