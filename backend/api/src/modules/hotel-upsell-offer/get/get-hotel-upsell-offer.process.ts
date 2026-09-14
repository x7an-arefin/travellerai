import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelUpsellOfferRepository } from '@modules/hotel-upsell-offer/hotel-upsell-offer.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelUpsellOffer — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelUpsellOfferRepository();

  const hotelUpsellOffer = await repo.findById(ctx.input.id as string);
  if (!hotelUpsellOffer) {
    throw new AppError('NOT_FOUND', 'HotelUpsellOffer not found', 404);
  }

  return { output: hotelUpsellOffer, entityId: hotelUpsellOffer.id };

}
