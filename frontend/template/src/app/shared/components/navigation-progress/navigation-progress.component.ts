import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-navigation-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div class="fixed top-0 left-0 right-0 z-[99999] pointer-events-none">
        <div
          class="h-[2px] sm:h-[3px] bg-primary transition-all duration-300 ease-out shadow-[0_0_10px_var(--color-primary)]"
          [style.width.%]="progress()"
          [style.opacity]="opacity()"
        ></div>
      </div>
    }
  `,
})
export class NavigationProgressComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router)
  private routerSub?: Subscription
  private timer?: any

  readonly isVisible = signal<boolean>(false)
  readonly progress = signal<number>(0)
  readonly opacity = signal<number>(1)

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.start()
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.complete()
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe()
    if (this.timer) clearInterval(this.timer)
  }

  private start(): void {
    if (this.timer) clearInterval(this.timer)
    this.opacity.set(1)
    this.progress.set(15)
    this.isVisible.set(true)

    // Simulate progress increments during async loading
    this.timer = setInterval(() => {
      const curr = this.progress()
      if (curr < 85) {
        const step = Math.max(1, (85 - curr) * 0.2)
        this.progress.set(curr + step)
      }
    }, 150)
  }

  private complete(): void {
    if (this.timer) clearInterval(this.timer)
    this.progress.set(100)

    setTimeout(() => {
      this.opacity.set(0)
      setTimeout(() => {
        this.isVisible.set(false)
        this.progress.set(0)
      }, 300)
    }, 200)
  }
}
