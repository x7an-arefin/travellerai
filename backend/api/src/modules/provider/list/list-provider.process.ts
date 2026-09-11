import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderRepository } from '@modules/provider/provider.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST Provider — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    providerType: ctx.input.providerType as string | undefined,
    approvalStatus: ctx.input.approvalStatus as string | undefined,
    country: ctx.input.country as string | undefined,
    kycStatus: ctx.input.kycStatus as string | undefined,

  });

  return { output: result, entityId: null };

}
