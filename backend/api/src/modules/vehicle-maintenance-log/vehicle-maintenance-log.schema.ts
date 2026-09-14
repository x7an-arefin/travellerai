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

export const serviceTypeEnum = pgEnum('vehicle_maintenance_logs_service_type', ['scheduled_periodic', 'oil_filter_change', 'tire_replacement', 'brake_pad_rotor', 'cng_cylinder_hydrostatic', 'engine_transmission', 'aircon_service', 'emergency_breakdown', 'body_paint']);


export const vehicleMaintenanceLogTable = pgTable(
  'vehicle_maintenance_logs',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    vehicleId: uuid("vehicle_id").notNull(),
    serviceType: serviceTypeEnum('service_type').default('scheduled_periodic'),
    description: text("description").notNull(),
    odometerAtService: integer("odometer_at_service").notNull(),
    serviceCost: decimal("service_cost", { precision: 10, scale: 2 }).notNull(),
    serviceProviderName: varchar("service_provider_name", { length: 150 }),
    invoicePdfUrl: varchar("invoice_pdf_url", { length: 500 }),
    servicedAt: timestamp("serviced_at", { withTimezone: true }).defaultNow().notNull(),
    nextServiceDueOdometer: integer("next_service_due_odometer"),
    nextServiceDueDate: varchar("next_service_due_date", { length: 10 }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    vehicle_maintenance_logs_vehicle_idx: index('vehicle_maintenance_logs_vehicle_idx').on(table.vehicleId),
  })
);

export type VehicleMaintenanceLogInsert = typeof vehicleMaintenanceLogTable.$inferInsert;
export type VehicleMaintenanceLogSelect = typeof vehicleMaintenanceLogTable.$inferSelect;
