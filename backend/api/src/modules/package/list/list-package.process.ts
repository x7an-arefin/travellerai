import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { PackageRepository } from '@modules/package/package.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST Package — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new PackageRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    providerId: ctx.input.providerId as string | undefined,
    categoryId: ctx.input.categoryId as string | undefined,
    destinationId: ctx.input.destinationId as string | undefined,
    productType: ctx.input.productType as string | undefined,
    status: ctx.input.status as string | undefined,
    isFeatured: ctx.input.isFeatured as string | undefined,
    difficultyLevel: ctx.input.difficultyLevel as string | undefined,
    confirmationType: ctx.input.confirmationType as string | undefined,

  });

  return { output: result, entityId: null };

}
