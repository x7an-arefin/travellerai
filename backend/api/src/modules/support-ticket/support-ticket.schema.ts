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

export const priorityEnum = pgEnum('support_tickets_priority', ['low', 'medium', 'high', 'urgent']);

export const statusEnum = pgEnum('support_tickets_status', ['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']);


export const supportTicketTable = pgTable(
  'support_tickets',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ticketNumber: varchar("ticket_number", { length: 20 }).unique().notNull(),
    userId: uuid("user_id"),
    providerId: uuid("provider_id"),
    bookingId: uuid("booking_id"),
    subject: varchar("subject", { length: 300 }).notNull(),
    description: text("description"),
    priority: priorityEnum('priority').default('medium'),
    category: varchar("category", { length: 100 }),
    status: statusEnum('status').default('open'),
    assignedAgentId: uuid("assigned_agent_id"),
    slDeadline: timestamp("sl_deadline", { withTimezone: true }),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    satisfactionRating: integer("satisfaction_rating"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    support_tickets_number_unique_idx: uniqueIndex('support_tickets_number_unique_idx').on(table.ticketNumber),
    support_tickets_user_status_idx: index('support_tickets_user_status_idx').on(table.userId, table.status),
    support_tickets_status_priority_idx: index('support_tickets_status_priority_idx').on(table.status, table.priority),
    support_tickets_agent_idx: index('support_tickets_agent_idx').on(table.assignedAgentId, table.status),
  })
);

export type SupportTicketInsert = typeof supportTicketTable.$inferInsert;
export type SupportTicketSelect = typeof supportTicketTable.$inferSelect;
