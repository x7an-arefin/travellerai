import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { TripInquiryRepository } from '@modules/trip-inquiry/trip-inquiry.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE TripInquiry — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new TripInquiryRepository();

  const tripInquiry = await repo.create(ctx.input as any);

  return { output: tripInquiry, entityId: tripInquiry.id };

}
