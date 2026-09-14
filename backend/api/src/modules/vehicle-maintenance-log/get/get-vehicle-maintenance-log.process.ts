import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleMaintenanceLogRepository } from '@modules/vehicle-maintenance-log/vehicle-maintenance-log.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET VehicleMaintenanceLog — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleMaintenanceLogRepository();

  const vehicleMaintenanceLog = await repo.findById(ctx.input.id as string);
  if (!vehicleMaintenanceLog) {
    throw new AppError('NOT_FOUND', 'VehicleMaintenanceLog not found', 404);
  }

  return { output: vehicleMaintenanceLog, entityId: vehicleMaintenanceLog.id };

}
