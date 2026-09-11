import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { WaitlistRepository } from '@modules/waitlist/waitlist.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE Waitlist — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new WaitlistRepository();

  const waitlist = await repo.create(ctx.input as any);

  return { output: waitlist, entityId: waitlist.id };

}
