import { hono } from './app.js';
import { validateBindings } from '@core/startup/validate-bindings.js';
/**
 * @author arefin
 * @description Cloudflare Worker entry point — validates bindings and delegates to the HonestJS application
 */
export default {
    fetch(request, env, ctx) {
        validateBindings(env);
        return hono.fetch(request, env, ctx);
    },
    scheduled(_event, env, ctx) {
        // Scheduled handlers are dispatched per-cron in the app router
        void ctx;
        void env;
    },
    async queue(batch, env, ctx) {
        const { domainEventConsumer } = await import('./consumers/domain-event.consumer.js');
        const { deadLetterConsumer } = await import('./consumers/dead-letter.consumer.js');
        if (batch.queue.endsWith('-dlq')) {
            return deadLetterConsumer(batch, env, ctx);
        }
        return domainEventConsumer(batch, env, ctx);
    },
};
//# sourceMappingURL=index.js.map