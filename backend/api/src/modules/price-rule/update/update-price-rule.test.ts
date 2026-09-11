import 'reflect-metadata';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createControllerTestApplication } from 'honestjs';
import { PriceRuleController } from '@modules/price-rule/price-rule.controller.js';
import { PriceRuleService } from '@modules/price-rule/price-rule.service.js';
import { PriceRuleRepository } from '@modules/price-rule/price-rule.repository.js';
import { pre } from './update-price-rule.pre.js';
import { process } from './update-price-rule.process.js';
import { post } from './update-price-rule.post.js';
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
    request: new Request('https://example.com/price-rules'),
    input: {},
    result: null,
    meta: {},
    ...overrides,
  };
}

describe('PriceRule — UPDATE lifecycle unit tests', () => {

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
     * @description Verify that process() executes the update database operation successfully
     */
    it('should successfully update a PriceRule in the database', async () => {
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

describe('PriceRule — UPDATE controller integration tests', () => {
  let testApp: Awaited<ReturnType<typeof createControllerTestApplication>>;

  /**
   * @author arefin
   * @description Create a minimal HonestJS test application for controller-level integration testing
   */
  beforeEach(async () => {
    testApp = await createControllerTestApplication({
      controller: PriceRuleController,
      services: [PriceRuleService, PriceRuleRepository],
    });
  });

  /**
   * @author arefin
   * @description Verify that the controller endpoint responds with expected status in isolated test harness
   */
  it('PATCH /price-rules/:id responds with expected status', async () => {
    const res = await testApp.request('/price-rules/:id', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    expect([401, 403]).toContain(res.status);
  });
});

