import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelPropertyRepository } from '@modules/hotel-property/hotel-property.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelProperty — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelPropertyRepository();

  const hotelProperty = await repo.findById(ctx.input.id as string);
  if (!hotelProperty) {
    throw new AppError('NOT_FOUND', 'HotelProperty not found', 404);
  }

  return { output: hotelProperty, entityId: hotelProperty.id };

}
