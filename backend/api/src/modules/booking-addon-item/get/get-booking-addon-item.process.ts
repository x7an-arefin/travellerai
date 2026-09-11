import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { BookingAddonItemRepository } from '@modules/booking-addon-item/booking-addon-item.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET BookingAddonItem — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new BookingAddonItemRepository();

  const bookingAddonItem = await repo.findById(ctx.input.id as string);
  if (!bookingAddonItem) {
    throw new AppError('NOT_FOUND', 'BookingAddonItem not found', 404);
  }

  return { output: bookingAddonItem, entityId: bookingAddonItem.id };

}
