import { Injectable, signal } from '@angular/core';

export interface TenantContext {
  id: string;
  name: string;
  plan?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class TenantService {
  readonly currentTenant = signal<TenantContext | null>(null);
  readonly availableTenants = signal<TenantContext[]>([]);

  setTenants(tenants: TenantContext[], activeId?: string): void {
    this.availableTenants.set(tenants);
    const initial = tenants.find((t) => t.id === activeId) ?? tenants[0] ?? null;
    this.currentTenant.set(initial);
  }

  switchTenant(tenantId: string): void {
    const found = this.availableTenants().find((t) => t.id === tenantId);
    if (found) {
      this.currentTenant.set(found);
      if (typeof window !== 'undefined') {
        localStorage.setItem('fast_app_tenant_id', tenantId);
      }
    }
  }

  getTenantId(): string | null {
    return this.currentTenant()?.id ?? null;
  }
}
