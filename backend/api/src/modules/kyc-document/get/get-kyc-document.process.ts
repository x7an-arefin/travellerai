import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { KycDocumentRepository } from '@modules/kyc-document/kyc-document.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for GET KycDocument — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new KycDocumentRepository();

  const kycDocument = await repo.findById(ctx.input.id as string);
  if (!kycDocument) {
    throw new AppError('NOT_FOUND', 'KycDocument not found', 404);
  }

  return { output: kycDocument, entityId: kycDocument.id };

}
