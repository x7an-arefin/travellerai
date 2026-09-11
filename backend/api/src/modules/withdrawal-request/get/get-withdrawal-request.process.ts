import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { WithdrawalRequestRepository } from '@modules/withdrawal-request/withdrawal-request.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET WithdrawalRequest — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new WithdrawalRequestRepository();

  const withdrawalRequest = await repo.findById(ctx.input.id as string);
  if (!withdrawalRequest) {
    throw new AppError('NOT_FOUND', 'WithdrawalRequest not found', 404);
  }

  return { output: withdrawalRequest, entityId: withdrawalRequest.id };

}
