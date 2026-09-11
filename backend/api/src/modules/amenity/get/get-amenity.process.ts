import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { AmenityRepository } from '@modules/amenity/amenity.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Amenity — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new AmenityRepository();

  const amenity = await repo.findById(ctx.input.id as string);
  if (!amenity) {
    throw new AppError('NOT_FOUND', 'Amenity not found', 404);
  }

  return { output: amenity, entityId: amenity.id };

}
