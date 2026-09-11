import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface TableUrlState {
  search?: string;
  filters?: Record<string, string | string[]>;
  sortField?: string | null;
  sortDirection?: 'asc' | 'desc' | null;
  page?: number;
  pageSize?: number;
  cursor?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UrlStateService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Sync table/filter/sort/pagination state to URL query parameters
   */
  syncTableStateToUrl(state: TableUrlState): void {
    const queryParams: Record<string, string | number | null> = {};

    if (state.search) {
      queryParams['q'] = state.search;
    } else {
      queryParams['q'] = null;
    }

    if (state.page && state.page > 1) {
      queryParams['page'] = state.page;
    } else {
      queryParams['page'] = null;
    }

    if (state.pageSize && state.pageSize !== 20) {
      queryParams['pageSize'] = state.pageSize;
    } else {
      queryParams['pageSize'] = null;
    }

    if (state.sortField) {
      queryParams['sort'] = `${state.sortField}:${state.sortDirection || 'asc'}`;
    } else {
      queryParams['sort'] = null;
    }

    if (state.cursor) {
      queryParams['cursor'] = state.cursor;
    } else {
      queryParams['cursor'] = null;
    }

    if (state.filters) {
      for (const [key, value] of Object.entries(state.filters)) {
        if (value !== undefined && value !== null && value !== '') {
          queryParams[`filter_${key}`] = Array.isArray(value) ? value.join(',') : String(value);
        } else {
          queryParams[`filter_${key}`] = null;
        }
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  /**
   * Restore table state from current URL query parameters
   */
  restoreTableStateFromUrl(): TableUrlState {
    const snapshot = this.route.snapshot.queryParams;
    const result: TableUrlState = {};

    if (snapshot['q']) {
      result.search = String(snapshot['q']);
    }

    if (snapshot['page']) {
      const pageNum = parseInt(String(snapshot['page']), 10);
      if (!isNaN(pageNum) && pageNum > 0) result.page = pageNum;
    }

    if (snapshot['pageSize']) {
      const size = parseInt(String(snapshot['pageSize']), 10);
      if (!isNaN(size) && size > 0) result.pageSize = size;
    }

    if (snapshot['sort']) {
      const [field, dir] = String(snapshot['sort']).split(':');
      result.sortField = field || null;
      result.sortDirection = dir === 'desc' ? 'desc' : 'asc';
    }

    if (snapshot['cursor']) {
      result.cursor = String(snapshot['cursor']);
    }

    const filters: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(snapshot)) {
      if (key.startsWith('filter_')) {
        const fieldName = key.replace('filter_', '');
        const valStr = String(value);
        filters[fieldName] = valStr.includes(',') ? valStr.split(',') : valStr;
      }
    }
    if (Object.keys(filters).length > 0) {
      result.filters = filters;
    }

    return result;
  }

  /**
   * Generates a shareable URL containing the encoded state
   */
  toShareableUrl(state: TableUrlState): string {
    const url = new URL(window.location.href);
    if (state.search) url.searchParams.set('q', state.search);
    if (state.page && state.page > 1) url.searchParams.set('page', String(state.page));
    if (state.sortField) url.searchParams.set('sort', `${state.sortField}:${state.sortDirection || 'asc'}`);
    if (state.filters) {
      for (const [key, val] of Object.entries(state.filters)) {
        if (val) url.searchParams.set(`filter_${key}`, Array.isArray(val) ? val.join(',') : String(val));
      }
    }
    return url.toString();
  }
}
