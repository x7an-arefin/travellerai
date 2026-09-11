import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { LoyaltyAccountRepository } from '@modules/loyalty-account/loyalty-account.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST LoyaltyAccount — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new LoyaltyAccountRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    userId: ctx.input.userId as string | undefined,
    tier: ctx.input.tier as string | undefined,

  });

  return { output: result, entityId: null };

}
