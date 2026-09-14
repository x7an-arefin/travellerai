import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelUpsellConversionRepository } from '@modules/hotel-upsell-conversion/hotel-upsell-conversion.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelUpsellConversion — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelUpsellConversionRepository();

  const hotelUpsellConversion = await repo.findById(ctx.input.id as string);
  if (!hotelUpsellConversion) {
    throw new AppError('NOT_FOUND', 'HotelUpsellConversion not found', 404);
  }

  return { output: hotelUpsellConversion, entityId: hotelUpsellConversion.id };

}
