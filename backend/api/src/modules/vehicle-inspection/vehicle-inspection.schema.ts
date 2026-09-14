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

export const inspectionTypeEnum = pgEnum('vehicle_inspections_inspection_type', ['pre_handover', 'post_return']);


export const vehicleInspectionTable = pgTable(
  'vehicle_inspections',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleBookingId: uuid("vehicle_booking_id").notNull(),
    vehicleId: uuid("vehicle_id").notNull(),
    inspectionType: inspectionTypeEnum('inspection_type').default('pre_handover'),
    odometerKm: integer("odometer_km").notNull(),
    fuelPercent: integer("fuel_percent").notNull().default(100),
    cngPressureBar: integer("cng_pressure_bar"),
    damageMarkers: jsonb("damage_markers"),
    generalNotes: text("general_notes"),
    photoUrls: jsonb("photo_urls"),
    inspectorUserId: uuid("inspector_user_id"),
    customerSignatureUrl: varchar("customer_signature_url", { length: 500 }),
    inspectorSignatureUrl: varchar("inspector_signature_url", { length: 500 }),
    inspectionPdfUrl: varchar("inspection_pdf_url", { length: 500 }),
    inspectedAt: timestamp("inspected_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_inspections_booking_idx: index('vehicle_inspections_booking_idx').on(table.vehicleBookingId),
  })
);

export type VehicleInspectionInsert = typeof vehicleInspectionTable.$inferInsert;
export type VehicleInspectionSelect = typeof vehicleInspectionTable.$inferSelect;
