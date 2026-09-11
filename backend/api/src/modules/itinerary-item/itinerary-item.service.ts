import { Service } from 'honestjs';
import type { Context } from 'hono';
import type { Env } from '@generated/bindings.js';
import { runLifecycle } from '@core/lifecycle/run-lifecycle.js';
import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import { ItineraryItemRepository } from './itinerary-item.repository.js';

import { pre as createPre } from './create/create-itinerary-item.pre.js';
import { process as createProcess } from './create/create-itinerary-item.process.js';
import { post as createPost } from './create/create-itinerary-item.post.js';

import { pre as getPre } from './get/get-itinerary-item.pre.js';
import { process as getProcess } from './get/get-itinerary-item.process.js';
import { post as getPost } from './get/get-itinerary-item.post.js';

import { pre as listPre } from './list/list-itinerary-item.pre.js';
import { process as listProcess } from './list/list-itinerary-item.process.js';
import { post as listPost } from './list/list-itinerary-item.post.js';

import { pre as updatePre } from './update/update-itinerary-item.pre.js';
import { process as updateProcess } from './update/update-itinerary-item.process.js';
import { post as updatePost } from './update/update-itinerary-item.post.js';

import { pre as deletePre } from './delete/delete-itinerary-item.pre.js';
import { process as deleteProcess } from './delete/delete-itinerary-item.process.js';
import { post as deletePost } from './delete/delete-itinerary-item.post.js';


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
    meta: { entity: 'ItineraryItem', operation, eventName },
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
 * @description Service that bridges HonestJS DI with the PRE → PROCESS → POST lifecycle engine for ItineraryItem operations
 */
@Service()
export class ItineraryItemService {
  constructor(private readonly repository: ItineraryItemRepository) {}

  /**
   * @author arefin
   * @description Execute the create lifecycle (pre → process → post) for ItineraryItem and return a formatted HTTP response
   */
  async create(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'create', 'traveller.itinerary-item.created.v1');
    const result = await runLifecycle(ctx, {
      pre: createPre,
      process: createProcess,
      post: createPost,
    });
    return formatResponse(result, 'create', c);
  }

  /**
   * @author arefin
   * @description Execute the get lifecycle (pre → process → post) for ItineraryItem and return a formatted HTTP response
   */
  async get(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'get', 'traveller.itinerary-item.retrieved.v1');
    const result = await runLifecycle(ctx, {
      pre: getPre,
      process: getProcess,
      post: getPost,
    });
    return formatResponse(result, 'get', c);
  }

  /**
   * @author arefin
   * @description Execute the list lifecycle (pre → process → post) for ItineraryItem and return a formatted HTTP response
   */
  async list(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'list', 'traveller.itinerary-item.listed.v1');
    const result = await runLifecycle(ctx, {
      pre: listPre,
      process: listProcess,
      post: listPost,
    });
    return formatResponse(result, 'list', c);
  }

  /**
   * @author arefin
   * @description Execute the update lifecycle (pre → process → post) for ItineraryItem and return a formatted HTTP response
   */
  async update(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'update', 'traveller.itinerary-item.updated.v1');
    const result = await runLifecycle(ctx, {
      pre: updatePre,
      process: updateProcess,
      post: updatePost,
    });
    return formatResponse(result, 'update', c);
  }

  /**
   * @author arefin
   * @description Execute the delete lifecycle (pre → process → post) for ItineraryItem and return a formatted HTTP response
   */
  async delete(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'delete', 'traveller.itinerary-item.deleted.v1');
    const result = await runLifecycle(ctx, {
      pre: deletePre,
      process: deleteProcess,
      post: deletePost,
    });
    return formatResponse(result, 'delete', c);
  }
}
