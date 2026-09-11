import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { WaitlistRepository } from '@modules/waitlist/waitlist.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST Waitlist — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new WaitlistRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    departureId: ctx.input.departureId as string | undefined,
    status: ctx.input.status as string | undefined,

  });

  return { output: result, entityId: null };

}
