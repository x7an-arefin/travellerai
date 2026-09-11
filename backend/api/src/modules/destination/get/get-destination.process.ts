import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { DestinationRepository } from '@modules/destination/destination.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Destination — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new DestinationRepository();

  const destination = await repo.findById(ctx.input.id as string);
  if (!destination) {
    throw new AppError('NOT_FOUND', 'Destination not found', 404);
  }

  return { output: destination, entityId: destination.id };

}
