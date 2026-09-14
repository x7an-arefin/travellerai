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

export const offerTypeEnum = pgEnum('hotel_upsell_offers_offer_type', ['room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass']);


export const hotelUpsellOfferTable = pgTable(
  'hotel_upsell_offers',
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id").notNull(),
    offerType: offerTypeEnum('offer_type').default('room_upgrade'),
    title: varchar("title", { length: 150 }).notNull(),
    description: text("description"),
    targetRoomTypeId: uuid("target_room_type_id"),
    upgradedRoomTypeId: uuid("upgraded_room_type_id"),
    additionalPricePerNight: decimal("additional_price_per_night", { precision: 10, scale: 2 }).notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull().$onUpdate(() => new Date()),

  },
  (table) => ({
    hotel_upsell_offers_property_idx: index('hotel_upsell_offers_property_idx').on(table.propertyId),
  })
);

export type HotelUpsellOfferInsert = typeof hotelUpsellOfferTable.$inferInsert;
export type HotelUpsellOfferSelect = typeof hotelUpsellOfferTable.$inferSelect;
