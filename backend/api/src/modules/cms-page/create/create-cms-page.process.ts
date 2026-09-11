import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { CmsPageRepository } from '@modules/cms-page/cms-page.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE CmsPage — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new CmsPageRepository();

  const cmsPage = await repo.create(ctx.input as any);

  return { output: cmsPage, entityId: cmsPage.id };

}
