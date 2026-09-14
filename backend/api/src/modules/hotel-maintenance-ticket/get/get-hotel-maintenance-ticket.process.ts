import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelMaintenanceTicketRepository } from '@modules/hotel-maintenance-ticket/hotel-maintenance-ticket.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelMaintenanceTicket — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelMaintenanceTicketRepository();

  const hotelMaintenanceTicket = await repo.findById(ctx.input.id as string);
  if (!hotelMaintenanceTicket) {
    throw new AppError('NOT_FOUND', 'HotelMaintenanceTicket not found', 404);
  }

  return { output: hotelMaintenanceTicket, entityId: hotelMaintenanceTicket.id };

}
