import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { TripInquiryRepository } from '@modules/trip-inquiry/trip-inquiry.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET TripInquiry — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new TripInquiryRepository();

  const tripInquiry = await repo.findById(ctx.input.id as string);
  if (!tripInquiry) {
    throw new AppError('NOT_FOUND', 'TripInquiry not found', 404);
  }

  return { output: tripInquiry, entityId: tripInquiry.id };

}
