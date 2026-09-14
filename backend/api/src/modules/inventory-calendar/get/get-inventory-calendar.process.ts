import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { InventoryCalendarRepository } from '@modules/inventory-calendar/inventory-calendar.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET InventoryCalendar — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new InventoryCalendarRepository();

  const inventoryCalendar = await repo.findById(ctx.input.id as string);
  if (!inventoryCalendar) {
    throw new AppError('NOT_FOUND', 'InventoryCalendar not found', 404);
  }

  return { output: inventoryCalendar, entityId: inventoryCalendar.id };

}
