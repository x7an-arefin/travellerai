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


export const hotelUpsellConversionTable = pgTable(
  'hotel_upsell_conversions',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    offerId: uuid("offer_id").notNull(),
    hotelBookingId: uuid("hotel_booking_id").notNull(),
    revenueAmount: decimal("revenue_amount", { precision: 10, scale: 2 }).notNull(),
    guestEmail: varchar("guest_email", { length: 255 }),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    hotel_upsell_conversions_booking_idx: index('hotel_upsell_conversions_booking_idx').on(table.hotelBookingId),
  })
);

export type HotelUpsellConversionInsert = typeof hotelUpsellConversionTable.$inferInsert;
export type HotelUpsellConversionSelect = typeof hotelUpsellConversionTable.$inferSelect;
