import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PackageRepository } from '@modules/package/package.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Package — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PackageRepository();

  const packageItem = await repo.findById(ctx.input.id as string);
  if (!packageItem) {
    throw new AppError('NOT_FOUND', 'Package not found', 404);
  }

  return { output: packageItem, entityId: packageItem.id };

}
