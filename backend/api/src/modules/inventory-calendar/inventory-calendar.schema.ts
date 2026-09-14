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


export const inventoryCalendarTable = pgTable(
  'inventory_calendar',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roomTypeId: uuid("room_type_id").notNull(),
    propertyId: uuid("property_id").notNull(),
    calendarDate: varchar("calendar_date", { length: 10 }).notNull(),
    totalAvailable: integer("total_available").notNull().default(1),
    bookedCount: integer("booked_count").default(0),
    blockedCount: integer("blocked_count").default(0),
    stopSell: boolean("stop_sell").default(false),
    closedToArrival: boolean("closed_to_arrival").default(false),
    closedToDeparture: boolean("closed_to_departure").default(false),
    minStayNights: integer("min_stay_nights").default(1),
    rateMultiplier: decimal("rate_multiplier", { precision: 5, scale: 4 }).default('1.0000'),
    customBasePrice: decimal("custom_base_price", { precision: 12, scale: 2 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    inventory_calendar_date_idx: index('inventory_calendar_date_idx').on(table.roomTypeId, table.calendarDate),
  })
);

export type InventoryCalendarInsert = typeof inventoryCalendarTable.$inferInsert;
export type InventoryCalendarSelect = typeof inventoryCalendarTable.$inferSelect;
