import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { LoyaltyAccountRepository } from '@modules/loyalty-account/loyalty-account.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET LoyaltyAccount — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new LoyaltyAccountRepository();

  const loyaltyAccount = await repo.findById(ctx.input.id as string);
  if (!loyaltyAccount) {
    throw new AppError('NOT_FOUND', 'LoyaltyAccount not found', 404);
  }

  return { output: loyaltyAccount, entityId: loyaltyAccount.id };

}
