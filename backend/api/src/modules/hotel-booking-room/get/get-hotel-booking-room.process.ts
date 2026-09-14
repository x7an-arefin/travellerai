import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { HotelBookingRoomRepository } from '@modules/hotel-booking-room/hotel-booking-room.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET HotelBookingRoom — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new HotelBookingRoomRepository();

  const hotelBookingRoom = await repo.findById(ctx.input.id as string);
  if (!hotelBookingRoom) {
    throw new AppError('NOT_FOUND', 'HotelBookingRoom not found', 404);
  }

  return { output: hotelBookingRoom, entityId: hotelBookingRoom.id };

}
