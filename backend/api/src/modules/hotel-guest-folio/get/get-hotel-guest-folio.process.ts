import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelGuestFolioRepository } from '@modules/hotel-guest-folio/hotel-guest-folio.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelGuestFolio — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelGuestFolioRepository();

  const hotelGuestFolio = await repo.findById(ctx.input.id as string);
  if (!hotelGuestFolio) {
    throw new AppError('NOT_FOUND', 'HotelGuestFolio not found', 404);
  }

  return { output: hotelGuestFolio, entityId: hotelGuestFolio.id };

}
