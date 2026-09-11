import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ReviewResponseRepository } from '@modules/review-response/review-response.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE ReviewResponse — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ReviewResponseRepository();

  const reviewResponse = await repo.create(ctx.input as any);

  return { output: reviewResponse, entityId: reviewResponse.id };

}
