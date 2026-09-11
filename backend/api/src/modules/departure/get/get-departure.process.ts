import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { DepartureRepository } from '@modules/departure/departure.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Departure — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new DepartureRepository();

  const departure = await repo.findById(ctx.input.id as string);
  if (!departure) {
    throw new AppError('NOT_FOUND', 'Departure not found', 404);
  }

  return { output: departure, entityId: departure.id };

}
