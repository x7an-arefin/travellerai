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

export const categoryEnum = pgEnum('room_types_category', ['standard_room', 'deluxe_room', 'executive_suite', 'family_suite', 'presidential_suite', 'dormitory_bed', 'villa_bungalow']);

export const baseBedTypeEnum = pgEnum('room_types_base_bed_type', ['single', 'double', 'queen', 'king', 'twin', 'bunk_bed', 'sofa_bed']);

export const viewTypeEnum = pgEnum('room_types_view_type', ['city_view', 'sea_view', 'garden_view', 'mountain_view', 'pool_view', 'courtyard_view', 'no_view']);

export const bathroomTypeEnum = pgEnum('room_types_bathroom_type', ['private_ensuite', 'shared_bathroom', 'open_plan']);


export const roomTypeTable = pgTable(
  'room_types',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id").notNull(),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    category: categoryEnum('category').default('standard_room'),
    maxOccupancyAdults: integer("max_occupancy_adults").notNull().default(2),
    maxOccupancyChildren: integer("max_occupancy_children").default(1),
    maxTotalGuests: integer("max_total_guests").notNull().default(3),
    baseBedType: baseBedTypeEnum('base_bed_type').default('queen'),
    extraBedAvailable: boolean("extra_bed_available").default(false),
    extraBedCost: decimal("extra_bed_cost", { precision: 10, scale: 2 }),
    roomSizeSqm: integer("room_size_sqm"),
    viewType: viewTypeEnum('view_type').default('city_view'),
    bathroomType: bathroomTypeEnum('bathroom_type').default('private_ensuite'),
    smokingAllowed: boolean("smoking_allowed").default(false),
    basePricePerNight: decimal("base_price_per_night", { precision: 12, scale: 2 }).notNull(),
    totalUnitsCount: integer("total_units_count").notNull().default(1),
    amenities: jsonb("amenities"),
    photos: jsonb("photos"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    room_types_property_idx: index('room_types_property_idx').on(table.propertyId),
    room_types_category_idx: index('room_types_category_idx').on(table.category),
  })
);

export type RoomTypeInsert = typeof roomTypeTable.$inferInsert;
export type RoomTypeSelect = typeof roomTypeTable.$inferSelect;
