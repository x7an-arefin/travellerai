import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderQuotationRepository } from '@modules/provider-quotation/provider-quotation.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET ProviderQuotation — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderQuotationRepository();

  const providerQuotation = await repo.findById(ctx.input.id as string);
  if (!providerQuotation) {
    throw new AppError('NOT_FOUND', 'ProviderQuotation not found', 404);
  }

  return { output: providerQuotation, entityId: providerQuotation.id };

}
