import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { InventoryCalendarRepository } from '@modules/inventory-calendar/inventory-calendar.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE InventoryCalendar — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new InventoryCalendarRepository();

  const inventoryCalendar = await repo.create(ctx.input as any);

  return { output: inventoryCalendar, entityId: inventoryCalendar.id };

}
