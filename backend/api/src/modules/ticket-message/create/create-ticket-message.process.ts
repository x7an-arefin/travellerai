import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { TicketMessageRepository } from '@modules/ticket-message/ticket-message.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE TicketMessage — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new TicketMessageRepository();

  const ticketMessage = await repo.create(ctx.input as any);

  return { output: ticketMessage, entityId: ticketMessage.id };

}
