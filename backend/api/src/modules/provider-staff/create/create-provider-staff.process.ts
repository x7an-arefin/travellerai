import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { ProviderStaffRepository } from '@modules/provider-staff/provider-staff.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE ProviderStaff — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new ProviderStaffRepository();

  const providerStaff = await repo.create(ctx.input as any);

  return { output: providerStaff, entityId: providerStaff.id };

}
