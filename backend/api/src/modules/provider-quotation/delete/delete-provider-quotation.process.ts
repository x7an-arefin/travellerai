import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderQuotationRepository } from '@modules/provider-quotation/provider-quotation.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for DELETE ProviderQuotation — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderQuotationRepository();

  const id = ctx.input.id as string;
  const existing = await repo.findById(id);
  if (!existing) {
    throw new AppError('NOT_FOUND', 'ProviderQuotation not found', 404);
  }

  const deleted = await repo.delete(id);
  if (!deleted) {
    throw new AppError('DELETE_FAILED', 'Failed to delete ProviderQuotation', 500);
  }

  return { output: null, entityId: id };

}
