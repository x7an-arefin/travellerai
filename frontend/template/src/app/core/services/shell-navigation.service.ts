import { Injectable, signal } from '@angular/core';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  icon?: string;
  badge?: string | number;
  badgeColor?: 'indigo' | 'emerald' | 'amber' | 'rose';
  permissions?: string[];
  children?: NavigationItem[];
}

export interface NavigationGroup {
  id: string;
  title: string;
  items: NavigationItem[];
}

@Injectable({ providedIn: 'root' })
export class ShellNavigationService {
  readonly groups = signal<NavigationGroup[]>([]);
  readonly activeRoute = signal<string>('/');

  setGroups(groups: NavigationGroup[]): void {
    this.groups.set(groups);
  }

  updateBadge(itemId: string, badge: string | number | undefined): void {
    this.groups.update((groups) =>
      groups.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === itemId ? { ...item, badge } : item
        ),
      }))
    );
  }

  setActiveRoute(route: string): void {
    this.activeRoute.set(route);
  }
}
