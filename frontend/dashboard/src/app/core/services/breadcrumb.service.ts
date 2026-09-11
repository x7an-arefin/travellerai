import { Injectable, inject, signal } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

export interface BreadcrumbItem {
  label: string
  url: string
  isLast: boolean
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly router = inject(Router)
  readonly breadcrumbs = signal<BreadcrumbItem[]>([])

  constructor() {
    this.updateBreadcrumbs(this.router.url)

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateBreadcrumbs(event.urlAfterRedirects || event.url)
      })
  }

  private updateBreadcrumbs(url: string): void {
    const rawPath = url.split('?')[0]
    const segments = rawPath.split('/').filter(Boolean)

    if (segments.length === 0) {
      this.breadcrumbs.set([{ label: 'Dashboard', url: '/', isLast: true }])
      return
    }

    const items: BreadcrumbItem[] = [{ label: 'Dashboard', url: '/', isLast: false }]
    let cumulativeUrl = ''

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      cumulativeUrl += `/${seg}`

      const formattedLabel = seg
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      items.push({
        label: formattedLabel,
        url: cumulativeUrl,
        isLast: i === segments.length - 1,
      })
    }

    this.breadcrumbs.set(items)
  }
}
