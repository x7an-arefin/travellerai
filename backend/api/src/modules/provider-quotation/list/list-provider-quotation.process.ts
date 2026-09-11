import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderQuotationRepository } from '@modules/provider-quotation/provider-quotation.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST ProviderQuotation — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderQuotationRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    inquiryId: ctx.input.inquiryId as string | undefined,
    providerId: ctx.input.providerId as string | undefined,
    status: ctx.input.status as string | undefined,

  });

  return { output: result, entityId: null };

}
