import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PackageFaqRepository } from '@modules/package-faq/package-faq.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET PackageFaq — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PackageFaqRepository();

  const packageFaq = await repo.findById(ctx.input.id as string);
  if (!packageFaq) {
    throw new AppError('NOT_FOUND', 'PackageFaq not found', 404);
  }

  return { output: packageFaq, entityId: packageFaq.id };

}
