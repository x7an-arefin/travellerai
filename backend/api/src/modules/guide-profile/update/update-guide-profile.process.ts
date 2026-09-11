import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { GuideProfileRepository } from '@modules/guide-profile/guide-profile.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for UPDATE GuideProfile — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new GuideProfileRepository();

  const id = ctx.input.id as string;
  const existing = await repo.findById(id);
  if (!existing) {
    throw new AppError('NOT_FOUND', 'GuideProfile not found', 404);
  }

  const updated = await repo.update({ ...ctx.input, id: id });
  if (!updated) {
    throw new AppError('UPDATE_FAILED', 'Failed to update GuideProfile', 500);
  }

  return { output: updated, entityId: id };

}
