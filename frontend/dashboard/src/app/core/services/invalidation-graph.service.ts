import { Injectable, signal } from '@angular/core';

export interface ActionAuditEvent {
  id: string;
  action: string;
  actorId?: string;
  resourceId?: string;
  resourceType?: string;
  timestamp: string;
  status: 'success' | 'failure';
  payload?: Record<string, unknown>;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InvalidationGraphService {
  private readonly dependencyGraph = new Map<string, Set<string>>();
  private readonly listeners = new Map<string, Set<() => void>>();
  readonly auditEvents = signal<ActionAuditEvent[]>([]);

  constructor() {
    // Standard domain invalidation graph dependencies
    this.registerDependency('product.create', 'products');
    this.registerDependency('product.create', 'catalog.product-card-grid');
    this.registerDependency('product.update', 'products');
    this.registerDependency('product.update', 'catalog.product-card-grid');
    this.registerDependency('product.delete', 'products');
    this.registerDependency('product.delete', 'catalog.product-card-grid');
    this.registerDependency('product.publish', 'products');
    this.registerDependency('product.publish', 'catalog.product-card-grid');
    this.registerDependency('product.archive', 'products');
    this.registerDependency('product.archive', 'catalog.product-card-grid');
    this.registerDependency('product.inventory.adjust', 'products');
    this.registerDependency('product.inventory.adjust', 'inventory');
    this.registerDependency('variant.stock.update', 'products');
    this.registerDependency('variant.stock.update', 'variants');
    this.registerDependency('variant.price.update', 'products');
    this.registerDependency('variant.price.update', 'variants');
    this.registerDependency('category.reorder', 'categories');
    this.registerDependency('category.reorder', 'catalog.category-tree');
    this.registerDependency('order.fulfill', 'orders');
    this.registerDependency('order.fulfill', 'inventory');
    this.registerDependency('order.refund', 'orders');
    this.registerDependency('order.cancel', 'orders');
    this.registerDependency('user.save', 'users');
    this.registerDependency('user.delete', 'users');
  }

  /**
   * Register a dependency where triggering `triggerKey` invalidates `targetKey`
   */
  registerDependency(triggerKey: string, targetKey: string): void {
    if (!this.dependencyGraph.has(triggerKey)) {
      this.dependencyGraph.set(triggerKey, new Set());
    }
    this.dependencyGraph.get(triggerKey)!.add(targetKey);
  }

  /**
   * Subscribe a refresh callback to a target invalidation key
   */
  onInvalidate(targetKey: string, callback: () => void): () => void {
    if (!this.listeners.has(targetKey)) {
      this.listeners.set(targetKey, new Set());
    }
    this.listeners.get(targetKey)!.add(callback);

    return () => {
      this.listeners.get(targetKey)?.delete(callback);
    };
  }

  /**
   * Invalidate all downstream data sources connected to a trigger
   */
  invalidate(triggerKey: string): string[] {
    const affected = new Set<string>();
    const queue = [triggerKey];

    while (queue.length > 0) {
      const current = queue.shift()!;
      affected.add(current);
      const dependents = this.dependencyGraph.get(current);
      if (dependents) {
        for (const dep of dependents) {
          if (!affected.has(dep)) {
            affected.add(dep);
            queue.push(dep);
          }
        }
      }
    }

    // Trigger all listeners
    for (const key of affected) {
      const cbs = this.listeners.get(key);
      if (cbs) {
        for (const cb of cbs) {
          try {
            cb();
          } catch (err) {
            console.error(`Error in invalidation listener for ${key}:`, err);
          }
        }
      }
    }

    return Array.from(affected);
  }

  /**
   * Record and emit an action audit event
   */
  recordAuditEvent(event: Omit<ActionAuditEvent, 'id' | 'timestamp'>): ActionAuditEvent {
    const fullEvent: ActionAuditEvent = {
      ...event,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };

    this.auditEvents.update((events) => [fullEvent, ...events.slice(0, 99)]);
    return fullEvent;
  }
}
