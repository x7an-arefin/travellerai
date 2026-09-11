import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { BookingParticipantRepository } from '@modules/booking-participant/booking-participant.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE BookingParticipant — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new BookingParticipantRepository();

  const bookingParticipant = await repo.create(ctx.input as any);

  return { output: bookingParticipant, entityId: bookingParticipant.id };

}
