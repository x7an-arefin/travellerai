import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { GuideProfileRepository } from '@modules/guide-profile/guide-profile.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE GuideProfile — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new GuideProfileRepository();

  const guideProfile = await repo.create(ctx.input as any);

  return { output: guideProfile, entityId: guideProfile.id };

}
