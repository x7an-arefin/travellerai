import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideComponent,
  lucideLayers,
  lucideCopy,
  lucideCheck,
  lucideSliders,
  lucideEye,
  lucideSparkles,
  lucideBell,
  lucideShield,
  lucideDownload,
  lucidePlus,
  lucideTrash2,
  lucideExternalLink,
  lucideRefreshCw,
  lucideSearch,
  lucideUser,
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
import { HlmSheetImports } from '../../ui/sheet/hlm-sheet.components'
import { HlmDialogImports } from '../../ui/dialog/hlm-dialog.components'
import { HlmSelectImports, SelectOption } from '../../ui/select/hlm-select.components'
import { HlmSwitchComponent } from '../../ui/switch/hlm-switch.component'
import { HlmCheckboxComponent } from '../../ui/checkbox/hlm-checkbox.component'
import { HlmInputOtpComponent } from '../../ui/input-otp/hlm-input-otp.component'
import { HlmAvatarImports } from '../../ui/avatar/hlm-avatar.components'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    ...HlmSheetImports,
    ...HlmDialogImports,
    ...HlmSelectImports,
    ...HlmAvatarImports,
    HlmSwitchComponent,
    HlmCheckboxComponent,
    HlmInputOtpComponent,
  ],
  providers: [
    provideIcons({
      lucideComponent,
      lucideLayers,
      lucideCopy,
      lucideCheck,
      lucideSliders,
      lucideEye,
      lucideSparkles,
      lucideBell,
      lucideShield,
      lucideDownload,
      lucidePlus,
      lucideTrash2,
      lucideExternalLink,
      lucideRefreshCw,
      lucideSearch,
      lucideUser,
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
    <app-main [fixed]="true" class="space-y-6">
      <!-- Title & Actions Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Spartan UI Design System & Component Gallery</h1>
          <p class="text-xs text-muted-foreground">Interactive showcase of accessible standalone UI components built with Angular Signals and Tailwind CSS v4.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="testToast('success')" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideCheck" class="size-3.5 text-emerald-600" />
            <span>Test Success Toast</span>
          </button>
          <button hlmBtn size="sm" (click)="previewSheetSize('md')" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideLayers" class="size-3.5" />
            <span>Open Demo Sheet (MD)</span>
          </button>
        </div>
      </div>

      <!-- Component Section Tabs -->
      <div class="flex items-center gap-1.5 flex-wrap border-b pb-3">
        @for (sec of sections; track sec.id) {
          <button
            type="button"
            (click)="activeSection.set(sec.id)"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border"
            [class.bg-primary]="activeSection() === sec.id"
            [class.text-primary-foreground]="activeSection() === sec.id"
            [class.border-primary]="activeSection() === sec.id"
            [class.bg-card]="activeSection() !== sec.id"
            [class.text-muted-foreground]="activeSection() !== sec.id"
          >
            {{ sec.label }}
          </button>
        }
      </div>

      <!-- SECTION: BUTTONS & BADGES -->
      @if (activeSection() === 'buttons' || activeSection() === 'all') {
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-foreground">Buttons & CVA Variants</h2>
            <button hlmBtn variant="ghost" size="sm" (click)="copySnippet('button')" class="text-xs cursor-pointer gap-1">
              <ng-icon name="lucideCopy" class="size-3.5" />
              <span>Copy Template Syntax</span>
            </button>
          </div>

          <div hlmCard class="p-6 space-y-6 shadow-2xs">
            <!-- Button Variants Grid -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Button Variants</div>
              <div class="flex flex-wrap items-center gap-3">
                <button hlmBtn class="cursor-pointer">Primary Default</button>
                <button hlmBtn variant="secondary" class="cursor-pointer">Secondary</button>
                <button hlmBtn variant="outline" class="cursor-pointer">Outline</button>
                <button hlmBtn variant="ghost" class="cursor-pointer">Ghost</button>
                <button hlmBtn variant="destructive" class="cursor-pointer">Destructive</button>
                <button hlmBtn [disabled]="true">Disabled State</button>
              </div>
            </div>

            <!-- Button Sizes -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Button Sizes</div>
              <div class="flex flex-wrap items-center gap-3">
                <button hlmBtn size="sm" class="cursor-pointer">Small (sm)</button>
                <button hlmBtn size="default" class="cursor-pointer">Default</button>
                <button hlmBtn size="lg" class="cursor-pointer">Large (lg)</button>
                <button hlmBtn size="icon" class="cursor-pointer">
                  <ng-icon name="lucidePlus" class="size-4" />
                </button>
              </div>
            </div>

            <!-- Badges Gallery -->
            <div class="space-y-2 pt-4 border-t border-border">
              <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Badges & Status Tags</div>
              <div class="flex flex-wrap items-center gap-3">
                <span hlmBadge>Default Badge</span>
                <span hlmBadge variant="secondary">Secondary</span>
                <span hlmBadge variant="outline">Outline Tag</span>
                <span hlmBadge variant="destructive">Destructive</span>
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200">
                  Custom Emerald
                </span>
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-sky-500/10 text-sky-600 border border-sky-200">
                  Custom Sky
                </span>
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold bg-violet-500/10 text-violet-600 border border-violet-200">
                  Custom Violet
                </span>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- SECTION: FORM INPUTS & SELECTS -->
      @if (activeSection() === 'inputs' || activeSection() === 'all') {
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-foreground">Form Inputs, Custom Select & OTP</h2>
            <button hlmBtn variant="ghost" size="sm" (click)="copySnippet('select')" class="text-xs cursor-pointer gap-1">
              <ng-icon name="lucideCopy" class="size-3.5" />
              <span>Copy Select Syntax</span>
            </button>
          </div>

          <div hlmCard class="p-6 space-y-6 shadow-2xs">
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <!-- Custom Select Dropdown -->
              <div class="space-y-2">
                <label class="text-xs font-semibold text-foreground">Custom Spartan Select (Auto-flip)</label>
                <hlm-custom-select
                  [options]="demoSelectOptions"
                  [ngModel]="demoSelectValue"
                  (valueChange)="demoSelectValue = $event"
                  placeholder="Select Plan Tier"
                />
                <p class="text-[11px] text-muted-foreground">Selected: {{ demoSelectValue }}</p>
              </div>

              <!-- Switch & Checkbox -->
              <div class="space-y-3">
                <label class="text-xs font-semibold text-foreground">Toggles & Checkboxes</label>
                <div class="flex items-center justify-between p-2 rounded-lg border border-border">
                  <span class="text-xs">Real-Time Sync</span>
                  <hlm-switch [(ngModel)]="switchState" />
                </div>
                <div class="flex items-center gap-2 p-2">
                  <hlm-checkbox [(ngModel)]="checkboxState" id="terms-chk" />
                  <label for="terms-chk" class="text-xs font-medium cursor-pointer">Accept Terms & Conditions</label>
                </div>
              </div>

              <!-- 6-digit OTP Input -->
              <div class="space-y-2">
                <label class="text-xs font-semibold text-foreground">6-Digit OTP Security Input</label>
                <hlm-input-otp [(ngModel)]="otpCode" [otpLength]="6" />
                <p class="text-[11px] text-muted-foreground font-mono">Current value: {{ otpCode || '------' }}</p>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- SECTION: SHEETS & DIALOGS -->
      @if (activeSection() === 'overlays' || activeSection() === 'all') {
        <div class="space-y-4">
          <h2 class="text-base font-bold text-foreground">Animated Sheets & Dialog Overlays</h2>
          <div hlmCard class="p-6 space-y-4 shadow-2xs">
            <p class="text-xs text-muted-foreground">
              Spartan UI sheets support 3 sizes: <code class="font-bold text-foreground">size="sm"</code> (1/3 screen), <code class="font-bold text-foreground">size="md"</code> (1/2 screen), and <code class="font-bold text-foreground">size="xl"</code> (full screen) with 350ms slide-in and 280ms exit animation.
            </p>

            <div class="flex flex-wrap items-center gap-3">
              <button hlmBtn variant="outline" size="sm" (click)="previewSheetSize('sm')" class="cursor-pointer">
                Open Sheet (sm - 1/3 Width)
              </button>
              <button hlmBtn variant="outline" size="sm" (click)="previewSheetSize('md')" class="cursor-pointer">
                Open Sheet (md - 1/2 Width)
              </button>
              <button hlmBtn variant="outline" size="sm" (click)="previewSheetSize('xl')" class="cursor-pointer">
                Open Sheet (xl - Full Screen)
              </button>
              <button hlmBtn size="sm" (click)="dialogDemoOpen.set(true)" class="cursor-pointer">
                Open Dialog Modal
              </button>
            </div>
          </div>
        </div>
      }
    </app-main>

    <!-- Demo Sheet -->
    <hlm-sheet [isOpen]="demoSheetOpen()" position="right" [size]="demoSheetSize()" (closed)="demoSheetOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Spartan Sheet (size="{{ demoSheetSize() }}")</h3>
        <p hlmSheetDescription class="text-xs">Testing entry and exit animation physics.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
          <div class="font-bold text-foreground">Sheet Configuration</div>
          <p class="text-muted-foreground">
            Current size prop is set to <span class="font-mono font-bold text-primary">{{ demoSheetSize() }}</span>.
          </p>
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button hlmBtn (click)="demoSheetOpen.set(false)" class="cursor-pointer text-xs">
          Close Sheet
        </button>
      </div>
    </hlm-sheet>

    <!-- Demo Dialog -->
    <hlm-dialog [isOpen]="dialogDemoOpen()" (closed)="dialogDemoOpen.set(false)" class="max-w-md">
      <div class="space-y-4">
        <div>
          <h3 class="text-base font-bold text-foreground">Compact Alert Dialog</h3>
          <p class="text-xs text-muted-foreground">Dialogs are reserved for compact alerts, warnings, and confirmations.</p>
        </div>

        <p class="text-xs text-muted-foreground">
          This modal uses smooth scale-in and scale-out exit transitions.
        </p>

        <div class="flex justify-end gap-2 pt-2 border-t border-border">
          <button hlmBtn variant="outline" size="sm" (click)="dialogDemoOpen.set(false)" class="cursor-pointer text-xs">
            Dismiss
          </button>
        </div>
      </div>
    </hlm-dialog>
  `,
})
export class DesignSystemComponent {
  readonly activeSection = signal<string>('all')
  readonly demoSheetOpen = signal<boolean>(false)
  readonly demoSheetSize = signal<'sm' | 'md' | 'xl'>('md')
  readonly dialogDemoOpen = signal<boolean>(false)

  demoSelectValue = 'pro'
  switchState = true
  checkboxState = true
  otpCode = '482910'

  readonly sections = [
    { id: 'all', label: 'All Components' },
    { id: 'buttons', label: 'Buttons & Badges' },
    { id: 'inputs', label: 'Inputs & Selects' },
    { id: 'overlays', label: 'Sheets & Dialogs' },
  ]

  readonly demoSelectOptions: readonly SelectOption[] = [
    { label: 'Starter Tier ($19/mo)', value: 'starter' },
    { label: 'Professional Pro ($49/mo)', value: 'pro' },
    { label: 'Enterprise SLA ($199/mo)', value: 'enterprise' },
  ]

  testToast(type: 'success' | 'info' | 'error'): void {
    if (type === 'success') {
      toast.success('Action executed with success state.')
    }
  }

  previewSheetSize(size: 'sm' | 'md' | 'xl'): void {
    this.demoSheetSize.set(size)
    this.demoSheetOpen.set(true)
  }

  copySnippet(type: string): void {
    toast.success(`Copied Spartan UI ${type} template snippet to clipboard.`)
  }
}
