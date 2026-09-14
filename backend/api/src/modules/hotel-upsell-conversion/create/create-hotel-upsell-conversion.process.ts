import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelUpsellConversionRepository } from '@modules/hotel-upsell-conversion/hotel-upsell-conversion.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE HotelUpsellConversion — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelUpsellConversionRepository();

  const hotelUpsellConversion = await repo.create(ctx.input as any);

  return { output: hotelUpsellConversion, entityId: hotelUpsellConversion.id };

}
