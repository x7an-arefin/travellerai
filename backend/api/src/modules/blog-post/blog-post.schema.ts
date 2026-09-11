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

export const statusEnum = pgEnum('blog_posts_status', ['draft', 'published', 'scheduled', 'archived']);


export const blogPostTable = pgTable(
  'blog_posts',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 300 }).notNull(),
    slug: varchar("slug", { length: 350 }).unique().notNull(),
    excerpt: varchar("excerpt", { length: 500 }),
    content: text("content"),
    featuredImage: varchar("featured_image", { length: 500 }),
    authorId: uuid("author_id"),
    destinationId: uuid("destination_id"),
    categories: jsonb("categories"),
    tags: jsonb("tags"),
    status: statusEnum('status').default('draft'),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
    metaTitle: varchar("meta_title", { length: 200 }),
    metaDescription: varchar("meta_description", { length: 500 }),
    language: varchar("language", { length: 10 }).notNull(),
    viewCount: integer("view_count").default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    blog_posts_slug_unique_idx: uniqueIndex('blog_posts_slug_unique_idx').on(table.slug),
    blog_posts_status_idx: index('blog_posts_status_idx').on(table.status, table.publishedAt),
    blog_posts_destination_idx: index('blog_posts_destination_idx').on(table.destinationId, table.status),
    blog_posts_author_idx: index('blog_posts_author_idx').on(table.authorId),
  })
);

export type BlogPostInsert = typeof blogPostTable.$inferInsert;
export type BlogPostSelect = typeof blogPostTable.$inferSelect;
