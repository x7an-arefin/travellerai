import { drizzle } from 'drizzle-orm/postgres-js';
import { and, lt, isNotNull } from 'drizzle-orm';
import type { Env } from '@generated/bindings.js';
import { logger } from '@core/observability/logger.js';

/**
 * @author arefin
 * @description Scheduled job handler for sendBalanceReminders — runs on schedule 0 9 * * *
 * Send outstanding balance reminder notifications for partially-paid bookings
 */
export async function sendBalanceRemindersHandler(env: Env): Promise<void> {
  const startTime = Date.now();
  logger.info({ action: 'send-balance-reminders_started', cron: '0 9 * * *' });

  try {
    // TODO: Implement scheduled job logic
    // Description: Send outstanding balance reminder notifications for partially-paid bookings
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
      action: 'send-balance-reminders_completed',
      durationMs: Date.now() - startTime,
    });
  } catch (err) {
    logger.error({
      action: 'send-balance-reminders_failed',
      error: String(err),
      durationMs: Date.now() - startTime,
    });
    throw err;
  }
}
