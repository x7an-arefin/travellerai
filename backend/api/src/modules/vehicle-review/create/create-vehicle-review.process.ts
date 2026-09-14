import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleReviewRepository } from '@modules/vehicle-review/vehicle-review.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehicleReview — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleReviewRepository();

  const vehicleReview = await repo.create(ctx.input as any);

  return { output: vehicleReview, entityId: vehicleReview.id };

}
