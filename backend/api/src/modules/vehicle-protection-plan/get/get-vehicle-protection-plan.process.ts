import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleProtectionPlanRepository } from '@modules/vehicle-protection-plan/vehicle-protection-plan.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleProtectionPlan — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleProtectionPlanRepository();

  const vehicleProtectionPlan = await repo.findById(ctx.input.id as string);
  if (!vehicleProtectionPlan) {
    throw new AppError('NOT_FOUND', 'VehicleProtectionPlan not found', 404);
  }

  return { output: vehicleProtectionPlan, entityId: vehicleProtectionPlan.id };

}
