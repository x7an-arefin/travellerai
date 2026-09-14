import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { DriverRepository } from '@modules/driver/driver.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Driver — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new DriverRepository();

  const driver = await repo.findById(ctx.input.id as string);
  if (!driver) {
    throw new AppError('NOT_FOUND', 'Driver not found', 404);
  }

  return { output: driver, entityId: driver.id };

}
