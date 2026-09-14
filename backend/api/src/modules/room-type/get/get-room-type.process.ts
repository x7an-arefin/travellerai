import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RoomTypeRepository } from '@modules/room-type/room-type.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET RoomType — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RoomTypeRepository();

  const roomType = await repo.findById(ctx.input.id as string);
  if (!roomType) {
    throw new AppError('NOT_FOUND', 'RoomType not found', 404);
  }

  return { output: roomType, entityId: roomType.id };

}
