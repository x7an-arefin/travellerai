import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RatePlanRepository } from '@modules/rate-plan/rate-plan.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET RatePlan — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RatePlanRepository();

  const ratePlan = await repo.findById(ctx.input.id as string);
  if (!ratePlan) {
    throw new AppError('NOT_FOUND', 'RatePlan not found', 404);
  }

  return { output: ratePlan, entityId: ratePlan.id };

}
