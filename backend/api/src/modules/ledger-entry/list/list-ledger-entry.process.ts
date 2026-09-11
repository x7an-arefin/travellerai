import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { LedgerEntryRepository } from '@modules/ledger-entry/ledger-entry.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for LIST LedgerEntry — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new LedgerEntryRepository();

  const result = await repo.findAll({
    cursor: ctx.input.cursor as string | undefined,
    limit: ctx.input.limit as number | undefined,
    providerId: ctx.input.providerId as string | undefined,
    userId: ctx.input.userId as string | undefined,
    entryType: ctx.input.entryType as string | undefined,
    accountType: ctx.input.accountType as string | undefined,
    referenceType: ctx.input.referenceType as string | undefined,

  });

  return { output: result, entityId: null };

}
