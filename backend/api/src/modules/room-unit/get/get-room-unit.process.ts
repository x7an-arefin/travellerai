import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RoomUnitRepository } from '@modules/room-unit/room-unit.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET RoomUnit — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RoomUnitRepository();

  const roomUnit = await repo.findById(ctx.input.id as string);
  if (!roomUnit) {
    throw new AppError('NOT_FOUND', 'RoomUnit not found', 404);
  }

  return { output: roomUnit, entityId: roomUnit.id };

}
