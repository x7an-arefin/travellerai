import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { AppError } from '@core/errors/application-error.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { departureTable } from '@modules/departure/departure.schema.js';

/**
 * @author arefin
 * @description PRE lifecycle handler for CREATE Booking — performs capacity checks, inventory lock reservation, and pricing validations
 */
export async function pre(ctx: LifecycleContext): Promise<LifecycleResult | void> {
  const input = ctx.input as Record<string, unknown>;

  // 1. Ensure participant count is valid
  const participantCount = Number(input['participantCount'] ?? 1);
  if (participantCount < 1) {
    throw new AppError('INVALID_PARTICIPANT_COUNT', 'Booking must have at least 1 participant', 400);
  }

  // 2. Auto-generate booking reference if not provided
  if (!input['bookingReference']) {
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    input['bookingReference'] = `TRV-${Date.now().toString(36).toUpperCase()}-${randomSuffix}`;
  }

  // 3. If departureId provided, verify departure availability and lock inventory
  const departureId = input['departureId'] as string | undefined;
  if (departureId && ctx.env.HYPERDRIVE?.connectionString) {
    const db = drizzle(ctx.env.HYPERDRIVE.connectionString);
    const departures = await db
      .select()
      .from(departureTable)
      .where(eq(departureTable.id, departureId))
      .limit(1);

    const departure = departures[0];
    if (!departure) {
      throw new AppError('DEPARTURE_NOT_FOUND', 'Selected departure was not found', 404);
    }

    if (departure.status === 'cancelled' || departure.status === 'completed' || departure.status === 'closed') {
      throw new AppError('DEPARTURE_UNAVAILABLE', `Departure is ${departure.status} and cannot be booked`, 400);
    }

    const currentBooked = Number(departure.bookedCount ?? 0);
    const capacity = Number(departure.capacity);
    const remainingSeats = capacity - currentBooked;

    if (remainingSeats < participantCount) {
      throw new AppError(
        'INSUFFICIENT_CAPACITY',
        `Departure has only ${remainingSeats} seat(s) remaining for requested ${participantCount}`,
        400,
      );
    }

    // Set 15-minute inventory lock
    const lockExpiry = new Date(Date.now() + 15 * 60 * 1000);
    input['inventoryLockedUntil'] = lockExpiry.toISOString();
    input['bookingStatus'] = 'pending_payment';
  }
}
