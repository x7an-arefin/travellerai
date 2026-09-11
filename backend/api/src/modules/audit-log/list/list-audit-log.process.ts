import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { AuditLogRepository } from '@modules/audit-log/audit-log.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST AuditLog — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new AuditLogRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    actorId: ctx.input.actorId as string | undefined,
    entityType: ctx.input.entityType as string | undefined,
    severity: ctx.input.severity as string | undefined,

  });

  return { output: result, entityId: null };

}
