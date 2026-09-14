import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleBookingRepository } from '@modules/vehicle-booking/vehicle-booking.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehicleBooking — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleBookingRepository();

  const vehicleBooking = await repo.create(ctx.input as any);

  return { output: vehicleBooking, entityId: vehicleBooking.id };

}
