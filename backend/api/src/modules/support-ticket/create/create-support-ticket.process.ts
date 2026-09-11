import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { SupportTicketRepository } from '@modules/support-ticket/support-ticket.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE SupportTicket — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new SupportTicketRepository();

  const supportTicket = await repo.create(ctx.input as any);

  return { output: supportTicket, entityId: supportTicket.id };

}
