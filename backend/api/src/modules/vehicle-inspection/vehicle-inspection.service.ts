import { Service } from 'honestjs';
import type { Context } from 'hono';
import type { Env } from '@generated/bindings.js';
import { runLifecycle } from '@core/lifecycle/run-lifecycle.js';
import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import { VehicleInspectionRepository } from './vehicle-inspection.repository.js';

import { pre as createPre } from './create/create-vehicle-inspection.pre.js';
import { process as createProcess } from './create/create-vehicle-inspection.process.js';
import { post as createPost } from './create/create-vehicle-inspection.post.js';

import { pre as getPre } from './get/get-vehicle-inspection.pre.js';
import { process as getProcess } from './get/get-vehicle-inspection.process.js';
import { post as getPost } from './get/get-vehicle-inspection.post.js';

import { pre as listPre } from './list/list-vehicle-inspection.pre.js';
import { process as listProcess } from './list/list-vehicle-inspection.process.js';
import { post as listPost } from './list/list-vehicle-inspection.post.js';

import { pre as updatePre } from './update/update-vehicle-inspection.pre.js';
import { process as updateProcess } from './update/update-vehicle-inspection.process.js';
import { post as updatePost } from './update/update-vehicle-inspection.post.js';

import { pre as deletePre } from './delete/delete-vehicle-inspection.pre.js';
import { process as deleteProcess } from './delete/delete-vehicle-inspection.process.js';
import { post as deletePost } from './delete/delete-vehicle-inspection.post.js';


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
    meta: { entity: 'VehicleInspection', operation, eventName },
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
 * @description Service that bridges HonestJS DI with the PRE → PROCESS → POST lifecycle engine for VehicleInspection operations
 */
@Service()
export class VehicleInspectionService {
  constructor(private readonly repository: VehicleInspectionRepository) {}

  /**
   * @author arefin
   * @description Execute the create lifecycle (pre → process → post) for VehicleInspection and return a formatted HTTP response
   */
  async create(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'create', 'traveller.vehicle-inspection.created.v1');
    const result = await runLifecycle(ctx, {
      pre: createPre,
      process: createProcess,
      post: createPost,
    });
    return formatResponse(result, 'create', c);
  }

  /**
   * @author arefin
   * @description Execute the get lifecycle (pre → process → post) for VehicleInspection and return a formatted HTTP response
   */
  async get(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'get', 'traveller.vehicle-inspection.retrieved.v1');
    const result = await runLifecycle(ctx, {
      pre: getPre,
      process: getProcess,
      post: getPost,
    });
    return formatResponse(result, 'get', c);
  }

  /**
   * @author arefin
   * @description Execute the list lifecycle (pre → process → post) for VehicleInspection and return a formatted HTTP response
   */
  async list(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'list', 'traveller.vehicle-inspection.listed.v1');
    const result = await runLifecycle(ctx, {
      pre: listPre,
      process: listProcess,
      post: listPost,
    });
    return formatResponse(result, 'list', c);
  }

  /**
   * @author arefin
   * @description Execute the update lifecycle (pre → process → post) for VehicleInspection and return a formatted HTTP response
   */
  async update(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'update', 'traveller.vehicle-inspection.updated.v1');
    const result = await runLifecycle(ctx, {
      pre: updatePre,
      process: updateProcess,
      post: updatePost,
    });
    return formatResponse(result, 'update', c);
  }

  /**
   * @author arefin
   * @description Execute the delete lifecycle (pre → process → post) for VehicleInspection and return a formatted HTTP response
   */
  async delete(input: any, c: Context): Promise<Response> {
    const ctx = buildContext(input, c, 'delete', 'traveller.vehicle-inspection.deleted.v1');
    const result = await runLifecycle(ctx, {
      pre: deletePre,
      process: deleteProcess,
      post: deletePost,
    });
    return formatResponse(result, 'delete', c);
  }
}
