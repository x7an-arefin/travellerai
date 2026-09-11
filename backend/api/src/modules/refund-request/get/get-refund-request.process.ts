import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RefundRequestRepository } from '@modules/refund-request/refund-request.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET RefundRequest — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RefundRequestRepository();

  const refundRequest = await repo.findById(ctx.input.id as string);
  if (!refundRequest) {
    throw new AppError('NOT_FOUND', 'RefundRequest not found', 404);
  }

  return { output: refundRequest, entityId: refundRequest.id };

}
