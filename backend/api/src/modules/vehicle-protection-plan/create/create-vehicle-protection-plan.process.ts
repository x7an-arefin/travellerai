import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleProtectionPlanRepository } from '@modules/vehicle-protection-plan/vehicle-protection-plan.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehicleProtectionPlan — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleProtectionPlanRepository();

  const vehicleProtectionPlan = await repo.create(ctx.input as any);

  return { output: vehicleProtectionPlan, entityId: vehicleProtectionPlan.id };

}
