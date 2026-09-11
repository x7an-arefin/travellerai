import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RefundRequestRepository } from '@modules/refund-request/refund-request.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE RefundRequest — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RefundRequestRepository();

  const refundRequest = await repo.create(ctx.input as any);

  return { output: refundRequest, entityId: refundRequest.id };

}
