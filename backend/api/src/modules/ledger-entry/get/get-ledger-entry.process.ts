import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { LedgerEntryRepository } from '@modules/ledger-entry/ledger-entry.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET LedgerEntry — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new LedgerEntryRepository();

  const ledgerEntry = await repo.findById(ctx.input.id as string);
  if (!ledgerEntry) {
    throw new AppError('NOT_FOUND', 'LedgerEntry not found', 404);
  }

  return { output: ledgerEntry, entityId: ledgerEntry.id };

}
