import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { CategoryRepository } from '@modules/category/category.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET Category — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new CategoryRepository();

  const category = await repo.findById(ctx.input.id as string);
  if (!category) {
    throw new AppError('NOT_FOUND', 'Category not found', 404);
  }

  return { output: category, entityId: category.id };

}
