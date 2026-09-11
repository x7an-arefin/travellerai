import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { WaitlistRepository } from '@modules/waitlist/waitlist.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Waitlist — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new WaitlistRepository();

  const waitlist = await repo.findById(ctx.input.id as string);
  if (!waitlist) {
    throw new AppError('NOT_FOUND', 'Waitlist not found', 404);
  }

  return { output: waitlist, entityId: waitlist.id };

}
