import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleBookingExtraRepository } from '@modules/vehicle-booking-extra/vehicle-booking-extra.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleBookingExtra — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleBookingExtraRepository();

  const vehicleBookingExtra = await repo.findById(ctx.input.id as string);
  if (!vehicleBookingExtra) {
    throw new AppError('NOT_FOUND', 'VehicleBookingExtra not found', 404);
  }

  return { output: vehicleBookingExtra, entityId: vehicleBookingExtra.id };

}
