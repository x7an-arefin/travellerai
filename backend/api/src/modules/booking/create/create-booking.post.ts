import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import { publishEvent } from '@core/events/event-publisher.js';
import { BOOKING_EVENTS } from '@modules/booking/booking.events.js';

/**
 * @author arefin
 * @description POST lifecycle handler for CREATE Booking — publishes domain events and triggers confirmation flows
 */
export async function post(ctx: LifecycleContext): Promise<void> {
  const entityId = ctx.result?.entityId ?? 'unknown';
  const actor = ctx.meta['actor'] as { type: string; id: string } | undefined;
  const bookingData = (ctx.result?.output as Record<string, unknown>) ?? {};

  await publishEvent(ctx.env.DOMAIN_EVENTS, {
    eventName: BOOKING_EVENTS.CREATED,
    correlationId: ctx.correlationId,
    actor: actor ?? null,
    subject: { type: 'Booking', id: entityId },
    data: {
      bookingId: entityId,
      bookingReference: bookingData['bookingReference'],
      travelerId: bookingData['travelerId'],
      packageId: bookingData['packageId'],
      departureId: bookingData['departureId'],
      totalAmount: bookingData['totalAmount'],
      currency: bookingData['currency'],
      contactEmail: bookingData['contactEmail'],
      participantCount: bookingData['participantCount'],
      inventoryLockedUntil: bookingData['inventoryLockedUntil'],
    },
  });
}
