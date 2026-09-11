import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { AuditLogRepository } from '@modules/audit-log/audit-log.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE AuditLog — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new AuditLogRepository();

  const auditLog = await repo.create(ctx.input as any);

  return { output: auditLog, entityId: auditLog.id };

}
