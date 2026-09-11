import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ItineraryItemRepository } from '@modules/itinerary-item/itinerary-item.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE ItineraryItem — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ItineraryItemRepository();

  const itineraryItem = await repo.create(ctx.input as any);

  return { output: itineraryItem, entityId: itineraryItem.id };

}
