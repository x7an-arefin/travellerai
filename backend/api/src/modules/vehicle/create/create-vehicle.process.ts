import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleRepository } from '@modules/vehicle/vehicle.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE Vehicle — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleRepository();

  const vehicle = await repo.create(ctx.input as any);

  return { output: vehicle, entityId: vehicle.id };

}
