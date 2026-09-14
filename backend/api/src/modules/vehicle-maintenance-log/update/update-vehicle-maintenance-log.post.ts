import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';

import { publishEvent } from '@core/events/event-publisher.js';
import { VEHICLE_MAINTENANCE_LOG_EVENTS } from '@modules/vehicle-maintenance-log/vehicle-maintenance-log.events.js';


/**
 * @author arefin
 * @description POST lifecycle handler for UPDATE VehicleMaintenanceLog — publishes domain events and performs post-operation side effects after the core logic succeeds
 */
export async function post(ctx: LifecycleContext): Promise<void> {

  const entityId = ctx.result?.entityId ?? 'unknown';
  const actor = ctx.meta['actor'] as { type: string; id: string } | undefined;

  await publishEvent(ctx.env.DOMAIN_EVENTS, {
    eventName: VEHICLE_MAINTENANCE_LOG_EVENTS.UPDATED,
    correlationId: ctx.correlationId,
    actor: actor ?? null,
    subject: { type: 'VehicleMaintenanceLog', id: entityId },
    data: {
      entityId,
    },
  });


}
