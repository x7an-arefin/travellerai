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

export const chargeTypeEnum = pgEnum('vehicle_extra_charges_charge_type', ['excess_km', 'fuel_deficit', 'damage_repair', 'traffic_fine', 'late_return_fee', 'toll_reimbursement', 'cleaning_fee']);

export const deductionSourceEnum = pgEnum('vehicle_extra_charges_deduction_source', ['security_deposit', 'direct_bill']);

export const statusEnum = pgEnum('vehicle_extra_charges_status', ['pending_review', 'billed_to_deposit', 'contested_by_renter', 'waived', 'settled']);


export const vehicleExtraChargeTable = pgTable(
  'vehicle_extra_charges',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleBookingId: uuid("vehicle_booking_id").notNull(),
    chargeType: chargeTypeEnum('charge_type').default('excess_km'),
    description: varchar("description", { length: 255 }).notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    deductionSource: deductionSourceEnum('deduction_source').default('security_deposit'),
    proofPhotoUrls: jsonb("proof_photo_urls"),
    status: statusEnum('status').default('pending_review'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_extra_charges_booking_idx: index('vehicle_extra_charges_booking_idx').on(table.vehicleBookingId),
  })
);

export type VehicleExtraChargeInsert = typeof vehicleExtraChargeTable.$inferInsert;
export type VehicleExtraChargeSelect = typeof vehicleExtraChargeTable.$inferSelect;
