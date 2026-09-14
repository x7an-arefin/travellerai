import { cors } from 'hono/cors';
import type { Context, Next, MiddlewareHandler } from 'hono';
import type { IMiddleware } from 'honestjs';

/**
 * @author arefin
 * @description CORS middleware configured from the application security specification
 */
export const corsMiddleware: MiddlewareHandler = cors({
  origin: (origin) => {
    if (!origin) return 'https://travellerai.com';
    const allowed = [
      'https://travellerai.com',
      'https://app.travellerai.com',
      'https://admin.travellerai.com',
      'https://staging.travellerai.com',
      'http://localhost:4200',
      'http://localhost:3000',
      'http://localhost:8787',
    ];
    if (allowed.includes(origin) || origin.endsWith('.pages.dev') || origin.endsWith('.travellerai.com')) {
      return origin;
    }
    return allowed[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Correlation-ID'],
  credentials: true,
  maxAge: 86400,
});

export class CorsMiddleware implements IMiddleware {
  async use(c: Context, next: Next): Promise<Response | void> {
    return corsMiddleware(c, next);
  }
}
