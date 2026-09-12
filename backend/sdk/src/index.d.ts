import type { Env } from '@generated/bindings.js';
/**
 * @author arefin
 * @description Cloudflare Worker entry point — validates bindings and delegates to the HonestJS application
 */
declare const _default: {
    fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
    scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): void;
    queue(batch: MessageBatch<unknown>, env: Env, ctx: ExecutionContext): Promise<void>;
};
export default _default;
