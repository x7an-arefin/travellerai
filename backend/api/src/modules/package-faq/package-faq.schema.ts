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


export const packageFaqTable = pgTable(
  'package_faqs',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").notNull(),
    question: varchar("question", { length: 500 }).notNull(),
    answer: text("answer").notNull(),
    sortOrder: integer("sort_order"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    package_faqs_package_idx: index('package_faqs_package_idx').on(table.packageId),
  })
);

export type PackageFaqInsert = typeof packageFaqTable.$inferInsert;
export type PackageFaqSelect = typeof packageFaqTable.$inferSelect;
