import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { BookingRepository } from '@modules/booking/booking.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST Booking — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new BookingRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    travelerId: ctx.input.travelerId as string | undefined,
    packageId: ctx.input.packageId as string | undefined,
    departureId: ctx.input.departureId as string | undefined,
    bookingStatus: ctx.input.bookingStatus as string | undefined,
    checkinStatus: ctx.input.checkinStatus as string | undefined,

  });

  return { output: result, entityId: null };

}
