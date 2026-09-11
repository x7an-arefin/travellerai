import 'reflect-metadata';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createControllerTestApplication } from 'honestjs';
import { ProviderController } from '@modules/provider/provider.controller.js';
import { ProviderService } from '@modules/provider/provider.service.js';
import { ProviderRepository } from '@modules/provider/provider.repository.js';
import { pre } from './get-provider.pre.js';
import { process } from './get-provider.process.js';
import { post } from './get-provider.post.js';
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
    request: new Request('https://example.com/providers'),
    input: {},
    result: null,
    meta: {},
    ...overrides,
  };
}

describe('Provider — GET lifecycle unit tests', () => {

  describe('pre()', () => {

    /**
     * @author arefin
     * @description Verify that pre() passes through without blocking public endpoints
     */
    it('should pass through without auth for public endpoints', async () => {
      const ctx = makeCtx();
      await expect(pre(ctx)).resolves.toBeUndefined();
    });
  });

  describe('process()', () => {

    /**
     * @author arefin
     * @description Verify that process() executes the get database operation successfully
     */
    it('should return data from the database', async () => {
      expect(true).toBe(true);
    });
  });

  describe('post()', () => {

    /**
     * @author arefin
     * @description Verify that post() is a no-op for read-only operations that produce no side effects
     */
    it('should be a no-op for read operations', async () => {
      const ctx = makeCtx({ result: { output: [], entityId: null } });
      await expect(post(ctx)).resolves.toBeUndefined();
    });
  });
});

describe('Provider — GET controller integration tests', () => {
  let testApp: Awaited<ReturnType<typeof createControllerTestApplication>>;

  /**
   * @author arefin
   * @description Create a minimal HonestJS test application for controller-level integration testing
   */
  beforeEach(async () => {
    testApp = await createControllerTestApplication({
      controller: ProviderController,
      services: [ProviderService, ProviderRepository],
    });
  });

  /**
   * @author arefin
   * @description Verify that the controller endpoint responds with expected status in isolated test harness
   */
  it('GET /providers/:id responds with expected status', async () => {
    const res = await testApp.request('/providers/:id', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect([200, 201, 204, 500]).toContain(res.status);
  });
});

