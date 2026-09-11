import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ReviewResponseRepository } from '@modules/review-response/review-response.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET ReviewResponse — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ReviewResponseRepository();

  const reviewResponse = await repo.findById(ctx.input.id as string);
  if (!reviewResponse) {
    throw new AppError('NOT_FOUND', 'ReviewResponse not found', 404);
  }

  return { output: reviewResponse, entityId: reviewResponse.id };

}
