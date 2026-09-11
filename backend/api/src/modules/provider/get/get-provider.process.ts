import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderRepository } from '@modules/provider/provider.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Provider — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderRepository();

  const provider = await repo.findById(ctx.input.id as string);
  if (!provider) {
    throw new AppError('NOT_FOUND', 'Provider not found', 404);
  }

  return { output: provider, entityId: provider.id };

}
