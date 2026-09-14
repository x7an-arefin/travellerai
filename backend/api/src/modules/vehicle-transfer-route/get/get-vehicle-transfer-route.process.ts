import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleTransferRouteRepository } from '@modules/vehicle-transfer-route/vehicle-transfer-route.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleTransferRoute — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleTransferRouteRepository();

  const vehicleTransferRoute = await repo.findById(ctx.input.id as string);
  if (!vehicleTransferRoute) {
    throw new AppError('NOT_FOUND', 'VehicleTransferRoute not found', 404);
  }

  return { output: vehicleTransferRoute, entityId: vehicleTransferRoute.id };

}
