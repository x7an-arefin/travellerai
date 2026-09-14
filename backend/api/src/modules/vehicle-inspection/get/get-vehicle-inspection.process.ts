import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleInspectionRepository } from '@modules/vehicle-inspection/vehicle-inspection.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleInspection — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleInspectionRepository();

  const vehicleInspection = await repo.findById(ctx.input.id as string);
  if (!vehicleInspection) {
    throw new AppError('NOT_FOUND', 'VehicleInspection not found', 404);
  }

  return { output: vehicleInspection, entityId: vehicleInspection.id };

}
