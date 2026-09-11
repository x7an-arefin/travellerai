import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderQuotationRepository } from '@modules/provider-quotation/provider-quotation.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE ProviderQuotation — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderQuotationRepository();

  const providerQuotation = await repo.create(ctx.input as any);

  return { output: providerQuotation, entityId: providerQuotation.id };

}
