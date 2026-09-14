import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelBookingRepository } from '@modules/hotel-booking/hotel-booking.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelBooking — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelBookingRepository();

  const hotelBooking = await repo.findById(ctx.input.id as string);
  if (!hotelBooking) {
    throw new AppError('NOT_FOUND', 'HotelBooking not found', 404);
  }

  return { output: hotelBooking, entityId: hotelBooking.id };

}
