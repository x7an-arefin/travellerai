import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { LoyaltyAccountRepository } from '@modules/loyalty-account/loyalty-account.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE LoyaltyAccount — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new LoyaltyAccountRepository();

  const loyaltyAccount = await repo.create(ctx.input as any);

  return { output: loyaltyAccount, entityId: loyaltyAccount.id };

}
