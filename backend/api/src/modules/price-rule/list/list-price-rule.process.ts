import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PriceRuleRepository } from '@modules/price-rule/price-rule.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST PriceRule — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PriceRuleRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    packageId: ctx.input.packageId as string | undefined,
    departureId: ctx.input.departureId as string | undefined,
    pricingType: ctx.input.pricingType as string | undefined,
    seasonType: ctx.input.seasonType as string | undefined,
    status: ctx.input.status as string | undefined,

  });

  return { output: result, entityId: null };

}
