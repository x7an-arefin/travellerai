import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleBookingRepository } from '@modules/vehicle-booking/vehicle-booking.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleBooking — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleBookingRepository();

  const vehicleBooking = await repo.findById(ctx.input.id as string);
  if (!vehicleBooking) {
    throw new AppError('NOT_FOUND', 'VehicleBooking not found', 404);
  }

  return { output: vehicleBooking, entityId: vehicleBooking.id };

}
