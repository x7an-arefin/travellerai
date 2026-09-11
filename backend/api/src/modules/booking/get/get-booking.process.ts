import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { BookingRepository } from '@modules/booking/booking.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Booking — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new BookingRepository();

  const booking = await repo.findById(ctx.input.id as string);
  if (!booking) {
    throw new AppError('NOT_FOUND', 'Booking not found', 404);
  }

  return { output: booking, entityId: booking.id };

}
