import { Service } from 'honestjs';
import type { Context } from 'hono';
import type { Env } from '@generated/bindings.js';
import { runLifecycle } from '@core/lifecycle/run-lifecycle.js';
import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import { LoyaltyAccountRepository } from './loyalty-account.repository.js';

import { pre as createPre } from './create/create-loyalty-account.pre.js';
import { process as createProcess } from './create/create-loyalty-account.process.js';
import { post as createPost } from './create/create-loyalty-account.post.js';

import { pre as getPre } from './get/get-loyalty-account.pre.js';
import { process as getProcess } from './get/get-loyalty-account.process.js';
import { post as getPost } from './get/get-loyalty-account.post.js';

import { pre as listPre } from './list/list-loyalty-account.pre.js';
import { process as listProcess } from './list/list-loyalty-account.process.js';
import { post as listPost } from './list/list-loyalty-account.post.js';

import { pre as updatePre } from './update/update-loyalty-account.pre.js';
import { process as updateProcess } from './update/update-loyalty-account.process.js';
import { post as updatePost } from './update/update-loyalty-account.post.js';


/**
 * @author arefin
 * @description Build a LifecycleContext from the HonestJS Hono context and validated input data
 */
function buildContext(input: any, c: Context, operation: string, eventName: string): LifecycleContext {
  return {
    correlationId: c.req.header('x-correlation-id') ?? crypto.randomUUID(),
    env: ((c as any)?.env ?? {}) as Env,
    request: c.req.raw,
    input,
    result: null,
    meta: { entity: 'LoyaltyAccount', operation, eventName },
  };
}

/**
 * @author arefin
 * @description Format the lifecycle result into an HTTP Response based on the CRUD operation type
 */
function formatResponse(result: { output: unknown }, operation: string, c: Context): Response {
  const correlationId = c.req.header('x-correlation-id') ?? '';
  if (operation === 'delete') return new Response(null, { status: 204 });
  const status = operation === 'create' ? 201 : 200;
  c.header('x-correlation-id', correlationId);
  return c.json({ data: result.output, correlationId }, status);
}

/**
 * @author arefin
 * @description Service that bridges HonestJS DI with the PRE → PROCESS → POST lifecycle engine for LoyaltyAccount operations
 */
@Service()
export class LoyaltyAccountService {
  constructor(private readonly repository: LoyaltyAccountRepository) {}

  /**
   * @author arefin
   * @description Execute the create lifecycle (pre → process → post) for LoyaltyAccount and return a formatted HTTP response
   */
  async create(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'create', 'traveller.loyalty-account.created.v1');
    const result = await runLifecycle(ctx, {
      pre: createPre,
      process: createProcess,
      post: createPost,
    });
    return formatResponse(result, 'create', c);
  }

  /**
   * @author arefin
   * @description Execute the get lifecycle (pre → process → post) for LoyaltyAccount and return a formatted HTTP response
   */
  async get(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'get', 'traveller.loyalty-account.retrieved.v1');
    const result = await runLifecycle(ctx, {
      pre: getPre,
      process: getProcess,
      post: getPost,
    });
    return formatResponse(result, 'get', c);
  }

  /**
   * @author arefin
   * @description Execute the list lifecycle (pre → process → post) for LoyaltyAccount and return a formatted HTTP response
   */
  async list(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'list', 'traveller.loyalty-account.listed.v1');
    const result = await runLifecycle(ctx, {
      pre: listPre,
      process: listProcess,
      post: listPost,
    });
    return formatResponse(result, 'list', c);
  }

  /**
   * @author arefin
   * @description Execute the update lifecycle (pre → process → post) for LoyaltyAccount and return a formatted HTTP response
   */
  async update(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'update', 'traveller.loyalty-account.updated.v1');
    const result = await runLifecycle(ctx, {
      pre: updatePre,
      process: updateProcess,
      post: updatePost,
    });
    return formatResponse(result, 'update', c);
  }
}
