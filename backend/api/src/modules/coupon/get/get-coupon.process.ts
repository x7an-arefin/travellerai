import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { CouponRepository } from '@modules/coupon/coupon.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Coupon — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new CouponRepository();

  const coupon = await repo.findById(ctx.input.id as string);
  if (!coupon) {
    throw new AppError('NOT_FOUND', 'Coupon not found', 404);
  }

  return { output: coupon, entityId: coupon.id };

}
