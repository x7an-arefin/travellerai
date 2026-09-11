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

export const statusEnum = pgEnum('review_responses_status', ['published', 'hidden']);


export const reviewResponseTable = pgTable(
  'review_responses',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reviewId: uuid("review_id").unique().notNull(),
    providerId: uuid("provider_id").notNull(),
    responseText: text("response_text").notNull(),
    status: statusEnum('status').default('published'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    review_responses_review_unique_idx: uniqueIndex('review_responses_review_unique_idx').on(table.reviewId),
    review_responses_provider_idx: index('review_responses_provider_idx').on(table.providerId),
  })
);

export type ReviewResponseInsert = typeof reviewResponseTable.$inferInsert;
export type ReviewResponseSelect = typeof reviewResponseTable.$inferSelect;
