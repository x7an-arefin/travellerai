import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PaymentTransactionRepository } from '@modules/payment-transaction/payment-transaction.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET PaymentTransaction — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PaymentTransactionRepository();

  const paymentTransaction = await repo.findById(ctx.input.id as string);
  if (!paymentTransaction) {
    throw new AppError('NOT_FOUND', 'PaymentTransaction not found', 404);
  }

  return { output: paymentTransaction, entityId: paymentTransaction.id };

}
