import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ExchangeRateRepository } from '@modules/exchange-rate/exchange-rate.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE ExchangeRate — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ExchangeRateRepository();

  const exchangeRate = await repo.create(ctx.input as any);

  return { output: exchangeRate, entityId: exchangeRate.id };

}
