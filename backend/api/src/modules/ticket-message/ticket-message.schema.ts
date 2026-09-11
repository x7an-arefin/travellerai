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

export const senderTypeEnum = pgEnum('ticket_messages_sender_type', ['traveler', 'provider', 'agent', 'system']);


export const ticketMessageTable = pgTable(
  'ticket_messages',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ticketId: uuid("ticket_id").notNull(),
    senderId: uuid("sender_id").notNull(),
    senderType: senderTypeEnum('sender_type').default('traveler'),
    message: text("message").notNull(),
    attachments: jsonb("attachments"),
    isInternalNote: boolean("is_internal_note").default(false),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    ticket_messages_ticket_idx: index('ticket_messages_ticket_idx').on(table.ticketId),
    ticket_messages_sender_idx: index('ticket_messages_sender_idx').on(table.senderId),
  })
);

export type TicketMessageInsert = typeof ticketMessageTable.$inferInsert;
export type TicketMessageSelect = typeof ticketMessageTable.$inferSelect;
