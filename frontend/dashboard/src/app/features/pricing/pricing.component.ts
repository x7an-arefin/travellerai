import { Component, signal, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { BillingApiService } from '../billing/data-access/services/billing-api.service'
import {
  lucideCheck,
  lucideSparkles,
  lucideHelpCircle,
  lucideChevronDown,
  lucideArrowRight,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { ConfigDrawerComponent } from '../../shared/components/config-drawer/config-drawer.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmTableImports } from '../../ui/table/hlm-table.components'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    ThemeSwitchComponent,
    ConfigDrawerComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmTableImports,
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideSparkles,
      lucideHelpCircle,
      lucideChevronDown,
      lucideArrowRight,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-config-drawer />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main [fixed]="true" class="space-y-10 py-6 max-w-5xl mx-auto">
      <!-- Title & Frequency Switcher -->
      <div class="text-center space-y-3">
        <span hlmBadge variant="outline" class="text-xs uppercase font-bold tracking-wider text-primary">
          Plans & Pricing
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Flexible plans for every team size
        </h1>
        <p class="text-sm text-muted-foreground max-w-xl mx-auto">
          Start for free, scale with your product, and upgrade whenever your team grows.
        </p>

        <!-- Frequency Toggle -->
        <div class="flex items-center justify-center gap-3 pt-2">
          <span class="text-xs font-semibold" [class.text-muted-foreground]="isAnnual()">Monthly</span>
          <button
            type="button"
            (click)="isAnnual.set(!isAnnual())"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            [class.bg-primary]="isAnnual()"
          >
            <span
              class="pointer-events-none block size-5 rounded-full bg-background shadow-lg transition-transform"
              [class.translate-x-5]="isAnnual()"
              [class.translate-x-0]="!isAnnual()"
            ></span>
          </button>
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-semibold" [class.text-muted-foreground]="!isAnnual()">Annually</span>
            <span hlmBadge variant="secondary" class="text-[10px] font-bold text-emerald-600 bg-emerald-500/10">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      <!-- 3 Tier Cards Grid -->
      <div class="grid gap-6 md:grid-cols-3 items-stretch">
        <!-- Starter Tier -->
        <div hlmCard class="p-6 flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div class="space-y-4">
            <div>
              <h3 class="text-base font-bold text-foreground">Starter</h3>
              <p class="text-xs text-muted-foreground mt-1">For individuals and small side projects.</p>
            </div>

            <div class="text-3xl font-extrabold">
              \$0 <span class="text-xs font-normal text-muted-foreground">/ month</span>
            </div>

            <div class="h-px bg-border"></div>

            <ul class="space-y-2.5 text-xs text-muted-foreground">
              <li class="flex items-center gap-2 text-foreground font-medium">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Up to 3 team members</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>5 GB Cloud storage</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Standard Kanban boards</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Community Discord support</span>
              </li>
            </ul>
          </div>

          <button hlmBtn variant="outline" (click)="selectPlan('Starter')" class="w-full mt-6 cursor-pointer text-xs">
            Current Plan
          </button>
        </div>

        <!-- Pro Tier (Highlighted with Primary Glow) -->
        <div hlmCard class="p-6 flex flex-col justify-between relative border-2 border-primary shadow-xl bg-gradient-to-b from-card to-primary/5">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span hlmBadge variant="default" class="text-[10px] uppercase font-bold tracking-wider gap-1 shadow-md">
              <ng-icon name="lucideSparkles" class="size-3" />
              Most Popular
            </span>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-base font-bold text-foreground">Pro</h3>
              <p class="text-xs text-muted-foreground mt-1">For growing startups and scaling teams.</p>
            </div>

            <div class="text-3xl font-extrabold text-foreground">
              {{ isAnnual() ? '$24' : '$29' }} <span class="text-xs font-normal text-muted-foreground">/ month</span>
            </div>

            <div class="h-px bg-border"></div>

            <ul class="space-y-2.5 text-xs text-foreground font-medium">
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Up to 15 team members</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>50 GB Cloud storage</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Advanced Analytics & Charts</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Custom Webhook Integrations</span>
              </li>
              <li class="flex items-center gap-2">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Priority email support</span>
              </li>
            </ul>
          </div>

          <button hlmBtn (click)="selectPlan('Pro')" class="w-full mt-6 cursor-pointer text-xs shadow-md">
            Upgrade to Pro
          </button>
        </div>

        <!-- Enterprise Tier -->
        <div hlmCard class="p-6 flex flex-col justify-between hover:border-primary/40 transition-colors">
          <div class="space-y-4">
            <div>
              <h3 class="text-base font-bold text-foreground">Enterprise</h3>
              <p class="text-xs text-muted-foreground mt-1">For large-scale security and compliance.</p>
            </div>

            <div class="text-3xl font-extrabold">
              {{ isAnnual() ? '$79' : '$99' }} <span class="text-xs font-normal text-muted-foreground">/ month</span>
            </div>

            <div class="h-px bg-border"></div>

            <ul class="space-y-2.5 text-xs text-muted-foreground">
              <li class="flex items-center gap-2 text-foreground font-medium">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Unlimited team members</span>
              </li>
              <li class="flex items-center gap-2 text-foreground font-medium">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Unlimited storage & audit logs</span>
              </li>
              <li class="flex items-center gap-2 text-foreground font-medium">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>SSO & SAML Authentication</span>
              </li>
              <li class="flex items-center gap-2 text-foreground font-medium">
                <ng-icon name="lucideCheck" class="size-4 text-primary shrink-0" />
                <span>Custom SLA & 24/7 dedicated lead</span>
              </li>
            </ul>
          </div>

          <button hlmBtn variant="outline" (click)="selectPlan('Enterprise')" class="w-full mt-6 cursor-pointer text-xs">
            Contact Sales
          </button>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="space-y-4 pt-6">
        <h2 class="text-xl font-bold text-center text-foreground">Frequently Asked Questions</h2>
        <div class="grid gap-3 sm:grid-cols-2">
          @for (faq of faqs; track faq.q) {
            <div hlmCard class="p-4 space-y-1.5 shadow-2xs">
              <h4 class="text-xs font-bold text-foreground">{{ faq.q }}</h4>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ faq.a }}</p>
            </div>
          }
        </div>
      </div>
    </app-main>
  `,
})
export class PricingComponent {
  private readonly router = inject(Router)
  private readonly billingApi = inject(BillingApiService)

  readonly isAnnual = signal<boolean>(true)
  readonly activePlan = signal<string>('Starter')

  readonly faqs = [
    { q: 'Can I change my plan anytime?', a: 'Yes, you can upgrade, downgrade, or cancel your subscription at any moment from your billing dashboard.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) and bank transfers.' },
    { q: 'Is there a free trial for Pro?', a: 'Yes! Every workspace starts with a 14-day full Pro trial with zero credit card required.' },
    { q: 'Can I request custom invoice receipts?', a: 'Absolutely. All tax invoices with company details can be exported to PDF directly from Billing.' },
  ]

  selectPlan(plan: string): void {
    toast.success(`Selected ${plan} plan. Navigating to Billing Checkout...`)
    this.router.navigate(['/billing'], {
      queryParams: {
        plan: plan.toLowerCase(),
        cycle: this.isAnnual() ? 'annual' : 'monthly',
      },
    })
  }
}
