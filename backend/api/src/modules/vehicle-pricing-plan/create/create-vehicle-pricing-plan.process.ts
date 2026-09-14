import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehiclePricingPlanRepository } from '@modules/vehicle-pricing-plan/vehicle-pricing-plan.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehiclePricingPlan — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehiclePricingPlanRepository();

  const vehiclePricingPlan = await repo.create(ctx.input as any);

  return { output: vehiclePricingPlan, entityId: vehiclePricingPlan.id };

}
