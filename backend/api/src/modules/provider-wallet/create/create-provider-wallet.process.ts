import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderWalletRepository } from '@modules/provider-wallet/provider-wallet.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE ProviderWallet — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderWalletRepository();

  const providerWallet = await repo.create(ctx.input as any);

  return { output: providerWallet, entityId: providerWallet.id };

}
