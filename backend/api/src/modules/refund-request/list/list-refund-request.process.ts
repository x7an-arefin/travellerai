import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { RefundRequestRepository } from '@modules/refund-request/refund-request.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST RefundRequest — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new RefundRequestRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    bookingId: ctx.input.bookingId as string | undefined,
    initiatedBy: ctx.input.initiatedBy as string | undefined,
    status: ctx.input.status as string | undefined,
    refundMethod: ctx.input.refundMethod as string | undefined,

  });

  return { output: result, entityId: null };

}
