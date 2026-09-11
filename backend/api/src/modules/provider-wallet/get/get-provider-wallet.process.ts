import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderWalletRepository } from '@modules/provider-wallet/provider-wallet.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET ProviderWallet — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderWalletRepository();

  const providerWallet = await repo.findById(ctx.input.id as string);
  if (!providerWallet) {
    throw new AppError('NOT_FOUND', 'ProviderWallet not found', 404);
  }

  return { output: providerWallet, entityId: providerWallet.id };

}
