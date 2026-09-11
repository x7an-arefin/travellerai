import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { GiftCardRepository } from '@modules/gift-card/gift-card.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE GiftCard — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new GiftCardRepository();

  const giftCard = await repo.create(ctx.input as any);

  return { output: giftCard, entityId: giftCard.id };

}
