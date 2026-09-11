import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { CmsPageRepository } from '@modules/cms-page/cms-page.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET CmsPage — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new CmsPageRepository();

  const cmsPage = await repo.findById(ctx.input.id as string);
  if (!cmsPage) {
    throw new AppError('NOT_FOUND', 'CmsPage not found', 404);
  }

  return { output: cmsPage, entityId: cmsPage.id };

}
