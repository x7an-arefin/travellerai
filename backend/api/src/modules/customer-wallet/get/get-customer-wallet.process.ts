import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { CustomerWalletRepository } from '@modules/customer-wallet/customer-wallet.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET CustomerWallet — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new CustomerWalletRepository();

  const customerWallet = await repo.findById(ctx.input.id as string);
  if (!customerWallet) {
    throw new AppError('NOT_FOUND', 'CustomerWallet not found', 404);
  }

  return { output: customerWallet, entityId: customerWallet.id };

}
