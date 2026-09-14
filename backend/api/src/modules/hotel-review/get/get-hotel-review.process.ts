import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelReviewRepository } from '@modules/hotel-review/hotel-review.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelReview — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelReviewRepository();

  const hotelReview = await repo.findById(ctx.input.id as string);
  if (!hotelReview) {
    throw new AppError('NOT_FOUND', 'HotelReview not found', 404);
  }

  return { output: hotelReview, entityId: hotelReview.id };

}
