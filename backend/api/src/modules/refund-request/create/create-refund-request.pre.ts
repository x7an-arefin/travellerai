import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { verifySession } from '@core/auth/session-cache.js';
import { AppError } from '@core/errors/application-error.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { bookingTable } from '@modules/booking/booking.schema.js';
import { departureTable } from '@modules/departure/departure.schema.js';

/**
 * @author arefin
 * @description PRE lifecycle handler for CREATE RefundRequest — enforces cancellation window policies and calculates refund amounts
 */
export async function pre(ctx: LifecycleContext): Promise<LifecycleResult | void> {
  const session = await verifySession(ctx.env, ctx.request);
  if (session) {
    ctx.meta['actor'] = { type: 'user', id: session.userId };
  }

  const input = ctx.input as Record<string, unknown>;
  const bookingId = input['bookingId'] as string;

  if (!bookingId) {
    throw new AppError('MISSING_BOOKING_ID', 'Booking ID is required for refund requests', 400);
  }

  if (ctx.env.HYPERDRIVE?.connectionString) {
    const db = drizzle(ctx.env.HYPERDRIVE.connectionString);
    const bookings = await db.select().from(bookingTable).where(eq(bookingTable.id, bookingId)).limit(1);
    const booking = bookings[0];

    if (!booking) {
      throw new AppError('BOOKING_NOT_FOUND', 'Target booking was not found', 404);
    }

    // Verify ownership if user is not admin
    if (session && !session.roles.includes('admin') && booking.travelerId && booking.travelerId !== session.userId) {
      throw new AppError('FORBIDDEN', 'You do not have permission to request refunds for this booking', 403);
    }

    const paidAmount = Number(booking.paidAmount ?? 0);
    if (paidAmount <= 0) {
      throw new AppError('NON_REFUNDABLE', 'Booking has zero paid amount and cannot be refunded', 400);
    }

    // Determine cancellation policy tiers based on departure departure date
    let refundRate = 1.0;
    if (booking.departureId) {
      const departures = await db.select().from(departureTable).where(eq(departureTable.id, booking.departureId)).limit(1);
      const departure = departures[0];

      if (departure?.startDatetime) {
        const diffMs = new Date(departure.startDatetime).getTime() - Date.now();
        const daysUntilDeparture = diffMs / (1000 * 60 * 60 * 24);

        if (daysUntilDeparture >= 30) {
          refundRate = 1.0; // 100% refund (> 30 days)
        } else if (daysUntilDeparture >= 14) {
          refundRate = 0.5; // 50% refund (14-30 days)
        } else {
          refundRate = 0.0; // < 14 days is non-refundable by default policy
        }
      }
    }

    const calculatedRefund = paidAmount * refundRate;
    const cancellationFee = paidAmount - calculatedRefund;

    if (!input['requestedAmount']) {
      input['requestedAmount'] = String(calculatedRefund);
    }
    input['cancellationFee'] = String(cancellationFee);
    input['status'] = 'pending';
  }
}
