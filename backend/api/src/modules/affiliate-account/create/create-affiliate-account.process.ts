import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { AffiliateAccountRepository } from '@modules/affiliate-account/affiliate-account.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE AffiliateAccount — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new AffiliateAccountRepository();

  const affiliateAccount = await repo.create(ctx.input as any);

  return { output: affiliateAccount, entityId: affiliateAccount.id };

}
