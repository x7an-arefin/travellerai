import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { AffiliateAccountRepository } from '@modules/affiliate-account/affiliate-account.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET AffiliateAccount — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new AffiliateAccountRepository();

  const affiliateAccount = await repo.findById(ctx.input.id as string);
  if (!affiliateAccount) {
    throw new AppError('NOT_FOUND', 'AffiliateAccount not found', 404);
  }

  return { output: affiliateAccount, entityId: affiliateAccount.id };

}
