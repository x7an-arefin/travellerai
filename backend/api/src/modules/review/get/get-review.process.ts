import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ReviewRepository } from '@modules/review/review.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Review — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ReviewRepository();

  const review = await repo.findById(ctx.input.id as string);
  if (!review) {
    throw new AppError('NOT_FOUND', 'Review not found', 404);
  }

  return { output: review, entityId: review.id };

}
