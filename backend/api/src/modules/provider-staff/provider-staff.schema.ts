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

export const roleEnum = pgEnum('provider_staff_role', ['manager', 'finance', 'content', 'guide', 'custom']);

export const statusEnum = pgEnum('provider_staff_status', ['active', 'inactive', 'invited']);


export const providerStaffTable = pgTable(
  'provider_staff',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id").notNull(),
    userId: uuid("user_id").notNull(),
    role: roleEnum('role').default('manager'),
    permissions: jsonb("permissions"),
    status: statusEnum('status').default('invited'),
    invitedAt: timestamp("invited_at", { withTimezone: true }),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    provider_staff_provider_idx: index('provider_staff_provider_idx').on(table.providerId, table.status),
    provider_staff_user_idx: index('provider_staff_user_idx').on(table.userId),
  })
);

export type ProviderStaffInsert = typeof providerStaffTable.$inferInsert;
export type ProviderStaffSelect = typeof providerStaffTable.$inferSelect;
