import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { VehicleComplianceDocRepository } from '@modules/vehicle-compliance-doc/vehicle-compliance-doc.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE VehicleComplianceDoc — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new VehicleComplianceDocRepository();

  const vehicleComplianceDoc = await repo.create(ctx.input as any);

  return { output: vehicleComplianceDoc, entityId: vehicleComplianceDoc.id };

}
