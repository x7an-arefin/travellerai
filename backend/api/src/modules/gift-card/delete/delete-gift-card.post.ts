import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';

import { publishEvent } from '@core/events/event-publisher.js';
import { GIFT_CARD_EVENTS } from '@modules/gift-card/gift-card.events.js';


/**
 * @author arefin
 * @description POST lifecycle handler for DELETE GiftCard — publishes domain events and performs post-operation side effects after the core logic succeeds
 */
export async function post(ctx: LifecycleContext): Promise<void> {

  const entityId = ctx.result?.entityId ?? 'unknown';
  const actor = ctx.meta['actor'] as { type: string; id: string } | undefined;

  await publishEvent(ctx.env.DOMAIN_EVENTS, {
    eventName: GIFT_CARD_EVENTS.DELETED,
    correlationId: ctx.correlationId,
    actor: actor ?? null,
    subject: { type: 'GiftCard', id: entityId },
    data: {
      entityId,
    },
  });


}
