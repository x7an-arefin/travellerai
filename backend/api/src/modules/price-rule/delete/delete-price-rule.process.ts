import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PriceRuleRepository } from '@modules/price-rule/price-rule.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for DELETE PriceRule — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PriceRuleRepository();

  const id = ctx.input.id as string;
  const existing = await repo.findById(id);
  if (!existing) {
    throw new AppError('NOT_FOUND', 'PriceRule not found', 404);
  }

  const deleted = await repo.delete(id);
  if (!deleted) {
    throw new AppError('DELETE_FAILED', 'Failed to delete PriceRule', 500);
  }

  return { output: null, entityId: id };

}
