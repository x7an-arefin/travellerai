import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PaymentTransactionRepository } from '@modules/payment-transaction/payment-transaction.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST PaymentTransaction — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PaymentTransactionRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    bookingId: ctx.input.bookingId as string | undefined,
    gateway: ctx.input.gateway as string | undefined,
    status: ctx.input.status as string | undefined,
    transactionType: ctx.input.transactionType as string | undefined,

  });

  return { output: result, entityId: null };

}
