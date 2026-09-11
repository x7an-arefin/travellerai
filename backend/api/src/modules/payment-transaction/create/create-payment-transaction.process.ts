import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PaymentTransactionRepository } from '@modules/payment-transaction/payment-transaction.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE PaymentTransaction — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PaymentTransactionRepository();

  const paymentTransaction = await repo.create(ctx.input as any);

  return { output: paymentTransaction, entityId: paymentTransaction.id };

}
