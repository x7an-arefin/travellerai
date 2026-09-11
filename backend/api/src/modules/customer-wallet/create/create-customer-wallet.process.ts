import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { CustomerWalletRepository } from '@modules/customer-wallet/customer-wallet.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE CustomerWallet — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new CustomerWalletRepository();

  const customerWallet = await repo.create(ctx.input as any);

  return { output: customerWallet, entityId: customerWallet.id };

}
