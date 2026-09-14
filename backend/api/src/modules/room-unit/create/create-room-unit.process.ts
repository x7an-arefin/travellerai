import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RoomUnitRepository } from '@modules/room-unit/room-unit.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE RoomUnit — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RoomUnitRepository();

  const roomUnit = await repo.create(ctx.input as any);

  return { output: roomUnit, entityId: roomUnit.id };

}
