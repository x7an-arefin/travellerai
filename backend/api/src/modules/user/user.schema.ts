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

export const roleEnum = pgEnum('users_role', ['super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate']);

export const statusEnum = pgEnum('users_status', ['active', 'suspended', 'banned', 'pending_verification']);


export const userTable = pgTable(
  'users',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    phone: varchar("phone", { length: 30 }),
    passwordHash: varchar("password_hash", { length: 255 }),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    role: roleEnum('role').default('traveler'),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    isEmailVerified: boolean("is_email_verified").default(false),
    isPhoneVerified: boolean("is_phone_verified").default(false),
    status: statusEnum('status').default('pending_verification'),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    timezone: varchar("timezone", { length: 50 }),
    preferredCurrency: varchar("preferred_currency", { length: 3 }),
    preferredLanguage: varchar("preferred_language", { length: 10 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),

  },
  (table) => ({
    users_email_idx: uniqueIndex('users_email_idx').on(table.email),
    users_role_status_idx: index('users_role_status_idx').on(table.role, table.status),
  })
);

export type UserInsert = typeof userTable.$inferInsert;
export type UserSelect = typeof userTable.$inferSelect;
