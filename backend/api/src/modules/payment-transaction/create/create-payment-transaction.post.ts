import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import { publishEvent } from '@core/events/event-publisher.js';
import { PAYMENT_TRANSACTION_EVENTS } from '@modules/payment-transaction/payment-transaction.events.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { bookingTable } from '@modules/booking/booking.schema.js';
import { departureTable } from '@modules/departure/departure.schema.js';

/**
 * @author arefin
 * @description POST lifecycle handler for CREATE PaymentTransaction — updates booking payment status and confirms departure inventory
 */
export async function post(ctx: LifecycleContext): Promise<void> {
  const entityId = ctx.result?.entityId ?? 'unknown';
  const actor = ctx.meta['actor'] as { type: string; id: string } | undefined;
  const transaction = (ctx.result?.output as Record<string, unknown>) ?? {};

  const bookingId = transaction['bookingId'] as string | undefined;
  const status = transaction['status'] as string | undefined;
  const amount = Number(transaction['amount'] ?? 0);

  // If transaction succeeded and is linked to a booking, advance booking lifecycle
  if (bookingId && (status === 'completed' || status === 'succeeded') && ctx.env.HYPERDRIVE?.connectionString) {
    const db = drizzle(ctx.env.HYPERDRIVE.connectionString);
    const bookings = await db.select().from(bookingTable).where(eq(bookingTable.id, bookingId)).limit(1);
    const booking = bookings[0];

    if (booking) {
      const currentPaid = Number(booking.paidAmount ?? 0);
      const totalAmount = Number(booking.totalAmount);
      const newPaid = currentPaid + amount;
      const balanceDue = Math.max(0, totalAmount - newPaid);
      const isFullyPaid = balanceDue <= 0.001;

      await db
        .update(bookingTable)
        .set({
          paidAmount: String(newPaid),
          balanceDue: String(balanceDue),
          bookingStatus: isFullyPaid ? 'fully_paid' : 'partially_paid',
          confirmedAt: isFullyPaid ? new Date() : booking.confirmedAt,
          updatedAt: new Date(),
        })
        .where(eq(bookingTable.id, bookingId));

      // Advance departure booked seats if booking now confirmed
      if (booking.departureId && isFullyPaid) {
        const departures = await db.select().from(departureTable).where(eq(departureTable.id, booking.departureId)).limit(1);
        const departure = departures[0];
        if (departure) {
          const newBooked = (departure.bookedCount ?? 0) + booking.participantCount;
          await db
            .update(departureTable)
            .set({
              bookedCount: newBooked,
              updatedAt: new Date(),
            })
            .where(eq(departureTable.id, booking.departureId));
        }
      }
    }
  }

  await publishEvent(ctx.env.DOMAIN_EVENTS, {
    eventName: PAYMENT_TRANSACTION_EVENTS.CREATED,
    correlationId: ctx.correlationId,
    actor: actor ?? null,
    subject: { type: 'PaymentTransaction', id: entityId },
    data: {
      transactionId: entityId,
      bookingId,
      amount: String(amount),
      currency: transaction['currency'],
      status,
      paymentMethod: transaction['paymentMethod'],
      providerTxId: transaction['providerTransactionId'],
    },
  });
}
