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

export const statusEnum = pgEnum('categories_status', ['active', 'inactive']);


export const categoryTable = pgTable(
  'categories',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 200 }).unique().notNull(),
    parentId: uuid("parent_id"),
    icon: varchar("icon", { length: 100 }),
    coverImage: varchar("cover_image", { length: 500 }),
    description: text("description"),
    sortOrder: integer("sort_order"),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    categories_slug_unique_idx: uniqueIndex('categories_slug_unique_idx').on(table.slug),
    categories_parent_idx: index('categories_parent_idx').on(table.parentId, table.status),
  })
);

export type CategoryInsert = typeof categoryTable.$inferInsert;
export type CategorySelect = typeof categoryTable.$inferSelect;
