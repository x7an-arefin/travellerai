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

export const issueCategoryEnum = pgEnum('hotel_maintenance_tickets_issue_category', ['plumbing', 'electrical', 'hvac_aircon', 'furniture_fixtures', 'carpentry', 'lock_keycard', 'cleanliness_deep', 'pest_control', 'appliance']);

export const priorityEnum = pgEnum('hotel_maintenance_tickets_priority', ['low', 'normal', 'high', 'urgent']);

export const statusEnum = pgEnum('hotel_maintenance_tickets_status', ['open', 'assigned', 'in_progress', 'resolved', 'cannot_reproduce', 'cancelled']);


export const hotelMaintenanceTicketTable = pgTable(
  'hotel_maintenance_tickets',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id").notNull(),
    roomUnitId: uuid("room_unit_id"),
    roomNumber: varchar("room_number", { length: 20 }),
    reportedBy: uuid("reported_by"),
    issueCategory: issueCategoryEnum('issue_category').default('plumbing'),
    priority: priorityEnum('priority').default('normal'),
    description: text("description").notNull(),
    photoUrls: jsonb("photo_urls"),
    status: statusEnum('status').default('open'),
    assignedTo: varchar("assigned_to", { length: 150 }),
    resolutionNotes: text("resolution_notes"),
    costAmount: decimal("cost_amount", { precision: 10, scale: 2 }),
    reportedAt: timestamp("reported_at", { withTimezone: true }).defaultNow().notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    hotel_maintenance_tickets_property_idx: index('hotel_maintenance_tickets_property_idx').on(table.propertyId),
    hotel_maintenance_tickets_status_idx: index('hotel_maintenance_tickets_status_idx').on(table.status),
  })
);

export type HotelMaintenanceTicketInsert = typeof hotelMaintenanceTicketTable.$inferInsert;
export type HotelMaintenanceTicketSelect = typeof hotelMaintenanceTicketTable.$inferSelect;
