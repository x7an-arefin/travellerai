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

export const categoryEnum = pgEnum('amenities_category', ['comfort', 'safety', 'accessibility', 'connectivity', 'catering', 'transport']);

export const statusEnum = pgEnum('amenities_status', ['active', 'inactive']);


export const amenityTable = pgTable(
  'amenities',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    icon: varchar("icon", { length: 100 }),
    category: categoryEnum('category').default('comfort'),
    status: statusEnum('status').default('active'),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    amenities_category_idx: index('amenities_category_idx').on(table.category, table.status),
  })
);

export type AmenityInsert = typeof amenityTable.$inferInsert;
export type AmenitySelect = typeof amenityTable.$inferSelect;
