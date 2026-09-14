import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleTransferRouteRepository } from '@modules/vehicle-transfer-route/vehicle-transfer-route.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehicleTransferRoute — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleTransferRouteRepository();

  const vehicleTransferRoute = await repo.create(ctx.input as any);

  return { output: vehicleTransferRoute, entityId: vehicleTransferRoute.id };

}
