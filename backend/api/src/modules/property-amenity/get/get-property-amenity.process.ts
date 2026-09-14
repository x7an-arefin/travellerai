import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PropertyAmenityRepository } from '@modules/property-amenity/property-amenity.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET PropertyAmenity — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PropertyAmenityRepository();

  const propertyAmenity = await repo.findById(ctx.input.id as string);
  if (!propertyAmenity) {
    throw new AppError('NOT_FOUND', 'PropertyAmenity not found', 404);
  }

  return { output: propertyAmenity, entityId: propertyAmenity.id };

}
