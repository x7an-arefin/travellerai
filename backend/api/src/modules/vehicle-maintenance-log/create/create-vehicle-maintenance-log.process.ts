import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleMaintenanceLogRepository } from '@modules/vehicle-maintenance-log/vehicle-maintenance-log.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehicleMaintenanceLog — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleMaintenanceLogRepository();

  const vehicleMaintenanceLog = await repo.create(ctx.input as any);

  return { output: vehicleMaintenanceLog, entityId: vehicleMaintenanceLog.id };

}
