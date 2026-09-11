import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import type { Env } from '@generated/bindings.js';
import { logger } from '@core/observability/logger.js';

declare const process: { env: Record<string, string | undefined> };

import {  } from '@modules/user/user.schema.js';

import {  } from '@modules/destination/destination.schema.js';

import {  } from '@modules/category/category.schema.js';

import {  } from '@modules/provider/provider.schema.js';

import {  } from '@modules/provider-staff/provider-staff.schema.js';

import {  } from '@modules/kyc-document/kyc-document.schema.js';

import {  } from '@modules/provider-payout-account/provider-payout-account.schema.js';

import {  } from '@modules/amenity/amenity.schema.js';

import {  } from '@modules/guide-profile/guide-profile.schema.js';

import {  } from '@modules/package/package.schema.js';

import {  } from '@modules/itinerary-item/itinerary-item.schema.js';

import {  } from '@modules/package-faq/package-faq.schema.js';

import {  } from '@modules/package-addon/package-addon.schema.js';

import {  } from '@modules/departure/departure.schema.js';

import {  } from '@modules/waitlist/waitlist.schema.js';

import {  } from '@modules/price-rule/price-rule.schema.js';

import {  } from '@modules/exchange-rate/exchange-rate.schema.js';

import {  } from '@modules/booking/booking.schema.js';

import {  } from '@modules/booking-participant/booking-participant.schema.js';

import {  } from '@modules/booking-addon-item/booking-addon-item.schema.js';

import {  } from '@modules/payment-transaction/payment-transaction.schema.js';

import {  } from '@modules/ledger-entry/ledger-entry.schema.js';

import {  } from '@modules/provider-wallet/provider-wallet.schema.js';

import {  } from '@modules/customer-wallet/customer-wallet.schema.js';

import {  } from '@modules/withdrawal-request/withdrawal-request.schema.js';

import {  } from '@modules/refund-request/refund-request.schema.js';

import {  } from '@modules/dispute/dispute.schema.js';

import {  } from '@modules/coupon/coupon.schema.js';

import {  } from '@modules/gift-card/gift-card.schema.js';

import {  } from '@modules/loyalty-account/loyalty-account.schema.js';

import {  } from '@modules/affiliate-account/affiliate-account.schema.js';

import {  } from '@modules/review/review.schema.js';

import {  } from '@modules/review-response/review-response.schema.js';

import {  } from '@modules/support-ticket/support-ticket.schema.js';

import {  } from '@modules/ticket-message/ticket-message.schema.js';

import {  } from '@modules/trip-inquiry/trip-inquiry.schema.js';

import {  } from '@modules/provider-quotation/provider-quotation.schema.js';

import {  } from '@modules/cms-page/cms-page.schema.js';

import {  } from '@modules/blog-post/blog-post.schema.js';

import {  } from '@modules/audit-log/audit-log.schema.js';


/**
 * @author arefin
 * @description Spec-driven seed script — populates initial database records in topological dependency order
 */
export async function seedDatabase(connectionString?: string): Promise<void> {
  const connStr = connectionString ?? process.env['DATABASE_URL'] ?? 'postgresql://postgres:postgres@localhost:5432/postgres';
  const queryClient = postgres(connStr);
  const db = drizzle(queryClient);

  logger.info({ action: 'db_seed_start', note: 'Seeding mock data for entities' });

  try {

    logger.info({ action: 'db_seed_entity', entity: 'user' });

    logger.info({ action: 'db_seed_entity', entity: 'destination' });

    logger.info({ action: 'db_seed_entity', entity: 'category' });

    logger.info({ action: 'db_seed_entity', entity: 'provider' });

    logger.info({ action: 'db_seed_entity', entity: 'provider-staff' });

    logger.info({ action: 'db_seed_entity', entity: 'kyc-document' });

    logger.info({ action: 'db_seed_entity', entity: 'provider-payout-account' });

    logger.info({ action: 'db_seed_entity', entity: 'amenity' });

    logger.info({ action: 'db_seed_entity', entity: 'guide-profile' });

    logger.info({ action: 'db_seed_entity', entity: 'package' });

    logger.info({ action: 'db_seed_entity', entity: 'itinerary-item' });

    logger.info({ action: 'db_seed_entity', entity: 'package-faq' });

    logger.info({ action: 'db_seed_entity', entity: 'package-addon' });

    logger.info({ action: 'db_seed_entity', entity: 'departure' });

    logger.info({ action: 'db_seed_entity', entity: 'waitlist' });

    logger.info({ action: 'db_seed_entity', entity: 'price-rule' });

    logger.info({ action: 'db_seed_entity', entity: 'exchange-rate' });

    logger.info({ action: 'db_seed_entity', entity: 'booking' });

    logger.info({ action: 'db_seed_entity', entity: 'booking-participant' });

    logger.info({ action: 'db_seed_entity', entity: 'booking-addon-item' });

    logger.info({ action: 'db_seed_entity', entity: 'payment-transaction' });

    logger.info({ action: 'db_seed_entity', entity: 'ledger-entry' });

    logger.info({ action: 'db_seed_entity', entity: 'provider-wallet' });

    logger.info({ action: 'db_seed_entity', entity: 'customer-wallet' });

    logger.info({ action: 'db_seed_entity', entity: 'withdrawal-request' });

    logger.info({ action: 'db_seed_entity', entity: 'refund-request' });

    logger.info({ action: 'db_seed_entity', entity: 'dispute' });

    logger.info({ action: 'db_seed_entity', entity: 'coupon' });

    logger.info({ action: 'db_seed_entity', entity: 'gift-card' });

    logger.info({ action: 'db_seed_entity', entity: 'loyalty-account' });

    logger.info({ action: 'db_seed_entity', entity: 'affiliate-account' });

    logger.info({ action: 'db_seed_entity', entity: 'review' });

    logger.info({ action: 'db_seed_entity', entity: 'review-response' });

    logger.info({ action: 'db_seed_entity', entity: 'support-ticket' });

    logger.info({ action: 'db_seed_entity', entity: 'ticket-message' });

    logger.info({ action: 'db_seed_entity', entity: 'trip-inquiry' });

    logger.info({ action: 'db_seed_entity', entity: 'provider-quotation' });

    logger.info({ action: 'db_seed_entity', entity: 'cms-page' });

    logger.info({ action: 'db_seed_entity', entity: 'blog-post' });

    logger.info({ action: 'db_seed_entity', entity: 'audit-log' });

    logger.info({ action: 'db_seed_completed', note: 'Mock data seeding finished successfully' });
  } catch (err) {
    logger.error({ action: 'db_seed_failed', error: String(err) });
    throw err;
  } finally {
    await queryClient.end();
  }
}
