import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehiclePricingPlanRepository } from '@modules/vehicle-pricing-plan/vehicle-pricing-plan.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehiclePricingPlan — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehiclePricingPlanRepository();

  const vehiclePricingPlan = await repo.findById(ctx.input.id as string);
  if (!vehiclePricingPlan) {
    throw new AppError('NOT_FOUND', 'VehiclePricingPlan not found', 404);
  }

  return { output: vehiclePricingPlan, entityId: vehiclePricingPlan.id };

}
