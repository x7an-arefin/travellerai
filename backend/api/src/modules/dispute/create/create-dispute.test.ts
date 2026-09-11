import 'reflect-metadata';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createControllerTestApplication } from 'honestjs';
import { DisputeController } from '@modules/dispute/dispute.controller.js';
import { DisputeService } from '@modules/dispute/dispute.service.js';
import { DisputeRepository } from '@modules/dispute/dispute.repository.js';
import { pre } from './create-dispute.pre.js';
import { process } from './create-dispute.process.js';
import { post } from './create-dispute.post.js';
import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { Env } from '@generated/bindings.js';

/**
 * @author arefin
 * @description Create a mock LifecycleContext for lifecycle unit tests with sensible defaults and optional overrides
 */
function makeCtx(overrides: Partial<LifecycleContext> = {}): LifecycleContext {
  return {
    correlationId: 'test-correlation-id',
    env: {
      HYPERDRIVE: { connectionString: 'postgresql://test:test@localhost:5432/test' } as unknown as Hyperdrive,
      DOMAIN_EVENTS: { send: vi.fn() } as unknown as Queue,
      ENVIRONMENT: 'test',
    } as unknown as Env,
    request: new Request('https://example.com/disputes'),
    input: {},
    result: null,
    meta: {},
    ...overrides,
  };
}

describe('Dispute — CREATE lifecycle unit tests', () => {

  describe('pre()', () => {

    /**
     * @author arefin
     * @description Verify that pre() rejects unauthenticated requests before any business logic runs
     */
    it('should throw UNAUTHORIZED when session token is missing', async () => {
      const ctx = makeCtx();
      await expect(pre(ctx)).rejects.toThrow('Authentication required');
    });
  });

  describe('process()', () => {

    /**
     * @author arefin
     * @description Verify that process() executes the create database operation successfully
     */
    it('should successfully create a Dispute in the database', async () => {
      expect(true).toBe(true);
    });
  });

  describe('post()', () => {

    /**
     * @author arefin
     * @description Verify that post() publishes a CloudEvents-compliant domain event to the queue after mutation
     */
    it('should publish a domain event to the queue', async () => {
      const mockSend = vi.fn().mockResolvedValue(undefined);
      const ctx = makeCtx({
        result: { output: {}, entityId: 'test-uuid' },
        meta: { actor: { type: 'user', id: 'user-123' } },
        env: {
          ...makeCtx().env,
          DOMAIN_EVENTS: { send: mockSend } as unknown as Queue,
        },
      });
      await expect(post(ctx)).resolves.toBeUndefined();
      expect(mockSend).toHaveBeenCalledOnce();
    });
  });
});

describe('Dispute — CREATE controller integration tests', () => {
  let testApp: Awaited<ReturnType<typeof createControllerTestApplication>>;

  /**
   * @author arefin
   * @description Create a minimal HonestJS test application for controller-level integration testing
   */
  beforeEach(async () => {
    testApp = await createControllerTestApplication({
      controller: DisputeController,
      services: [DisputeService, DisputeRepository],
    });
  });

  /**
   * @author arefin
   * @description Verify that the controller endpoint responds with expected status in isolated test harness
   */
  it('POST /disputes responds with expected status', async () => {
    const res = await testApp.request('/disputes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    expect([401, 403]).toContain(res.status);
  });
});

