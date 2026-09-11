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

export const templateTypeEnum = pgEnum('cms_pages_template_type', ['static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info']);

export const statusEnum = pgEnum('cms_pages_status', ['draft', 'published', 'archived']);


export const cmsPageTable = pgTable(
  'cms_pages',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 350 }).unique().notNull(),
    content: text("content"),
    excerpt: varchar("excerpt", { length: 500 }),
    templateType: templateTypeEnum('template_type').default('static'),
    featuredImage: varchar("featured_image", { length: 500 }),
    status: statusEnum('status').default('draft'),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    canonicalUrl: varchar("canonical_url", { length: 500 }),
    language: varchar("language", { length: 10 }).notNull(),
    authorId: uuid("author_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    cms_pages_slug_unique_idx: uniqueIndex('cms_pages_slug_unique_idx').on(table.slug),
    cms_pages_status_idx: index('cms_pages_status_idx').on(table.status, table.publishedAt),
    cms_pages_type_idx: index('cms_pages_type_idx').on(table.templateType, table.status),
  })
);

export type CmsPageInsert = typeof cmsPageTable.$inferInsert;
export type CmsPageSelect = typeof cmsPageTable.$inferSelect;
