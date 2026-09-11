import { cors } from 'hono/cors';
import type { Context, Next, MiddlewareHandler } from 'hono';
import type { IMiddleware } from 'honestjs';

/**
 * @author arefin
 * @description CORS middleware configured from the application security specification
 */
export const corsMiddleware: MiddlewareHandler = cors({
  origin: ["https://travellerai.com","https://app.travellerai.com","https://staging.travellerai.com"],
  allowMethods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Correlation-ID'],
  credentials: true,
  maxAge: 86400,
});

export class CorsMiddleware implements IMiddleware {
  async use(c: Context, next: Next): Promise<Response | void> {
    return corsMiddleware(c, next);
  }
}
