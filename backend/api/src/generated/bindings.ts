export interface Env {
  [key: string]: unknown;
  HYPERDRIVE: Hyperdrive;

  AUTH_SESSION_KV: KVNamespace;


  DOMAIN_EVENTS: Queue;
  DOMAIN_EVENTS_DLQ: Queue;


  STRIPE_WEBHOOK_SECRET: string;

  PAYMENT_WEBHOOK_SECRET: string;


  RATE_LIMIT_KV: KVNamespace;


  ENVIRONMENT: string;
}
