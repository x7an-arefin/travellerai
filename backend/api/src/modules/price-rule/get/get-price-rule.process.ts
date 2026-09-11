import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PriceRuleRepository } from '@modules/price-rule/price-rule.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET PriceRule — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PriceRuleRepository();

  const priceRule = await repo.findById(ctx.input.id as string);
  if (!priceRule) {
    throw new AppError('NOT_FOUND', 'PriceRule not found', 404);
  }

  return { output: priceRule, entityId: priceRule.id };

}
