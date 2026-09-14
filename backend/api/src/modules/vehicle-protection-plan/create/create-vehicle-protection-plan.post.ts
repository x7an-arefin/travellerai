import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';

import { publishEvent } from '@core/events/event-publisher.js';
import { VEHICLE_PROTECTION_PLAN_EVENTS } from '@modules/vehicle-protection-plan/vehicle-protection-plan.events.js';


/**
 * @author arefin
 * @description POST lifecycle handler for CREATE VehicleProtectionPlan — publishes domain events and performs post-operation side effects after the core logic succeeds
 */
export async function post(ctx: LifecycleContext): Promise<void> {

  const entityId = ctx.result?.entityId ?? 'unknown';
  const actor = ctx.meta['actor'] as { type: string; id: string } | undefined;

  await publishEvent(ctx.env.DOMAIN_EVENTS, {
    eventName: VEHICLE_PROTECTION_PLAN_EVENTS.CREATED,
    correlationId: ctx.correlationId,
    actor: actor ?? null,
    subject: { type: 'VehicleProtectionPlan', id: entityId },
    data: {
      entityId,
    },
  });


}
