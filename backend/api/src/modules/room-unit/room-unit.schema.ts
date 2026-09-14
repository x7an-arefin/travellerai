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

export const physicalStatusEnum = pgEnum('room_units_physical_status', ['clean', 'dirty', 'cleaning_in_progress', 'inspected', 'out_of_order']);

export const currentOccupancyStatusEnum = pgEnum('room_units_current_occupancy_status', ['vacant', 'occupied', 'reserved']);


export const roomUnitTable = pgTable(
  'room_units',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roomTypeId: uuid("room_type_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    roomNumber: varchar("room_number", { length: 20 }).notNull(),
    floorNumber: integer("floor_number").default(1),
    wingOrBuilding: varchar("wing_or_building", { length: 50 }),
    physicalStatus: physicalStatusEnum('physical_status').default('clean'),
    currentOccupancyStatus: currentOccupancyStatusEnum('current_occupancy_status').default('vacant'),
    activeBookingId: uuid("active_booking_id"),
    cleanInspectedAt: timestamp("clean_inspected_at", { withTimezone: true }),
    lastCleanedBy: uuid("last_cleaned_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    room_units_property_idx: index('room_units_property_idx').on(table.propertyId),
    room_units_type_idx: index('room_units_type_idx').on(table.roomTypeId),
  })
);

export type RoomUnitInsert = typeof roomUnitTable.$inferInsert;
export type RoomUnitSelect = typeof roomUnitTable.$inferSelect;
