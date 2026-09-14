import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleExtraChargeRepository } from '@modules/vehicle-extra-charge/vehicle-extra-charge.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleExtraCharge — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleExtraChargeRepository();

  const vehicleExtraCharge = await repo.findById(ctx.input.id as string);
  if (!vehicleExtraCharge) {
    throw new AppError('NOT_FOUND', 'VehicleExtraCharge not found', 404);
  }

  return { output: vehicleExtraCharge, entityId: vehicleExtraCharge.id };

}
