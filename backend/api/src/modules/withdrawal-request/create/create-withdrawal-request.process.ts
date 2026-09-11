import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { WithdrawalRequestRepository } from '@modules/withdrawal-request/withdrawal-request.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE WithdrawalRequest — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new WithdrawalRequestRepository();

  const withdrawalRequest = await repo.create(ctx.input as any);

  return { output: withdrawalRequest, entityId: withdrawalRequest.id };

}
