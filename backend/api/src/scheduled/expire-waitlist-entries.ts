import { drizzle } from 'drizzle-orm/postgres-js';
import { and, lt, isNotNull } from 'drizzle-orm';
import type { Env } from '@generated/bindings.js';
import { logger } from '@core/observability/logger.js';
/**
 * @description Scheduled job handler for expireWaitlistEntries — runs on schedule every 6 hours
 * Expire waitlist entries that have not been actioned within the offer window
 */
export async function expireWaitlistEntriesHandler(env: Env): Promise<void> {
  const startTime = Date.now();
  logger.info({ action: 'expire-waitlist-entries_started', cron: '0 */6 * * *' });

  try {
    // TODO: Implement scheduled job logic
    // Description: Expire waitlist entries that have not been actioned within the offer window
    //
    // Example: Soft-deleted record cleanup
    // const db = drizzle(env.HYPERDRIVE.connectionString);
    // await db.delete(myTable).where(
    //   and(
    //     isNotNull(myTable.deletedAt),
    //     lt(myTable.deletedAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    //   )
    // );

    logger.info({
      action: 'expire-waitlist-entries_completed',
      durationMs: Date.now() - startTime,
    });
  } catch (err) {
    logger.error({
      action: 'expire-waitlist-entries_failed',
      error: String(err),
      durationMs: Date.now() - startTime,
    });
    throw err;
  }
}
