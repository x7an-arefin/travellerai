import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PriceRuleRepository } from '@modules/price-rule/price-rule.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE PriceRule — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PriceRuleRepository();

  const priceRule = await repo.create(ctx.input as any);

  return { output: priceRule, entityId: priceRule.id };

}
