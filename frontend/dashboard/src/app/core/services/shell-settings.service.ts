import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light' | 'system';
export type DensitySetting = 'compact' | 'comfortable' | 'spacious';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Injectable({ providedIn: 'root' })
export class ShellSettingsService {
  readonly themeMode = signal<ThemeMode>('system');
  readonly density = signal<DensitySetting>('comfortable');
  readonly locale = signal<string>('en');
  readonly timezone = signal<string>('UTC');
  readonly breadcrumbs = signal<BreadcrumbItem[]>([]);
  readonly themeTokens = signal<Record<string, string>>({});

  setThemeMode(mode: ThemeMode): void {
    this.themeMode.set(mode);
    if (typeof window !== 'undefined') {
      const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }

  setDensity(density: DensitySetting): void {
    this.density.set(density);
  }

  setLocale(locale: string): void {
    this.locale.set(locale);
  }

  setTimezone(timezone: string): void {
    this.timezone.set(timezone);
  }

  setBreadcrumbs(items: BreadcrumbItem[]): void {
    this.breadcrumbs.set(items);
  }

  setThemeTokens(tokens: Record<string, string>): void {
    this.themeTokens.set(tokens);
  }

  formatDate(date: Date | string | number): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat(this.locale(), {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: this.timezone(),
    }).format(d);
  }
}
