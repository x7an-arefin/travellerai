import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { verifySession } from '@core/auth/session-cache.js';
import { AppError } from '@core/errors/application-error.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and } from 'drizzle-orm';
import { bookingTable } from '@modules/booking/booking.schema.js';
import { reviewTable } from '@modules/review/review.schema.js';

/**
 * @author arefin
 * @description PRE lifecycle handler for CREATE Review — guards against unverified reviews and duplicate submissions
 */
export async function pre(ctx: LifecycleContext): Promise<LifecycleResult | void> {
  const session = await verifySession(ctx.env, ctx.request);
  if (!session) {
    throw new AppError('UNAUTHORIZED', 'Authentication required to post a review', 401);
  }
  ctx.meta['actor'] = { type: 'user', id: session.userId };

  const input = ctx.input as Record<string, unknown>;
  const bookingId = input['bookingId'] as string;
  const packageId = input['packageId'] as string;

  if (!bookingId) {
    throw new AppError('MISSING_BOOKING', 'Booking ID is required to review a package', 400);
  }

  if (ctx.env.HYPERDRIVE?.connectionString) {
    const db = drizzle(ctx.env.HYPERDRIVE.connectionString);

    // 1. Verify that the booking exists, belongs to the traveler, and is completed
    const bookings = await db
      .select()
      .from(bookingTable)
      .where(and(eq(bookingTable.id, bookingId), eq(bookingTable.packageId, packageId)))
      .limit(1);

    const booking = bookings[0];
    if (!booking) {
      throw new AppError('BOOKING_NOT_FOUND', 'Valid booking not found for this package', 404);
    }

    if (booking.travelerId && booking.travelerId !== session.userId && !session.roles.includes('admin')) {
      throw new AppError('FORBIDDEN', 'You can only review bookings made under your own account', 403);
    }

    if (booking.bookingStatus !== 'completed' && booking.bookingStatus !== 'fully_paid') {
      throw new AppError(
        'BOOKING_NOT_COMPLETED',
        'You can only submit reviews for completed or fully paid trips',
        400,
      );
    }

    // 2. Prevent duplicate reviews for the same booking
    const existingReviews = await db
      .select()
      .from(reviewTable)
      .where(eq(reviewTable.bookingId, bookingId))
      .limit(1);

    if (existingReviews.length > 0) {
      throw new AppError('REVIEW_EXISTS', 'A review has already been submitted for this booking', 409);
    }

    // Mark as verified booking review
    input['travelerId'] = session.userId;
    input['isVerifiedBooking'] = true;
    input['status'] = 'published';
  }
}
