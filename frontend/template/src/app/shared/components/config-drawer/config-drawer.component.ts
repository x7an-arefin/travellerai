import { Component, computed, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideSettings,
  lucideRotateCcw,
  lucideCheckCircle2,
  lucideCheck,
  lucideEye,
  lucideEyeOff,
  lucideLock,
  lucideCopy,
  lucideDownload,
} from '@ng-icons/lucide'
import { AppConfigService } from '@core/services/app-config.service'
import { HlmSheetImports } from '@ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '@ui/button/hlm-button.directive'
import { HlmSeparatorDirective } from '@ui/separator/hlm-separator.directive'
import { ThemeService } from '@core/services/theme.service'
import { LayoutService } from '@core/services/layout.service'
import { DirectionService, Direction } from '@core/services/direction.service'
import { ConfigIconsImports } from './config-icons.component'
import { cn } from '@core/utils/cn'

@Component({
  selector: 'app-config-drawer',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...ConfigIconsImports,
  ],
  providers: [
    provideIcons({
      lucideSettings,
      lucideRotateCcw,
      lucideCheckCircle2,
      lucideCheck,
      lucideEye,
      lucideEyeOff,
      lucideLock,
      lucideCopy,
      lucideDownload,
    }),
  ],
  template: `
    <!-- Settings Trigger Button in Top Header -->
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      class="size-8 sm:size-9 rounded-full cursor-pointer"
      (click)="isOpen.set(true)"
      aria-label="Open theme settings"
    >
      <ng-icon name="lucideSettings" class="size-4 sm:size-4.5" />
    </button>

    <!-- Side Sheet matching shadcn-admin Theme Settings Drawer -->
    <hlm-sheet [isOpen]="isOpen()" position="right" (closed)="isOpen.set(false)" class="w-full sm:max-w-md flex flex-col">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle class="text-lg font-semibold">Theme Settings</h3>
        <p hlmSheetDescription class="text-xs text-muted-foreground mt-1">
          Adjust color palette, border radius, appearance, and layout.
        </p>
      </div>

      <div class="flex-1 overflow-y-auto space-y-6 py-4 px-1 no-scrollbar">
        <!-- 1. Primary Color Swatches -->
        <div>
          <div class="mb-2 flex items-center justify-between text-sm font-semibold text-muted-foreground">
            <span>Color Preset</span>
            @if (themeService.preset() !== 'zinc') {
              <button
                type="button"
                (click)="themeService.setPreset('zinc')"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset color to default"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
            @for (preset of themeService.presets; track preset.name) {
              <button
                type="button"
                (click)="themeService.setPreset(preset.name)"
                class="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-all hover:bg-accent"
                [class.border-primary]="themeService.preset() === preset.name"
                [class.bg-accent]="themeService.preset() === preset.name"
              >
                <span
                  class="size-4 rounded-full shrink-0 shadow-2xs"
                  [style.backgroundColor]="preset.color"
                ></span>
                <span class="truncate">{{ preset.label }}</span>
              </button>
            }
          </div>
        </div>

        <!-- 2. Radius Slider / Selector -->
        <div>
          <div class="mb-2 flex items-center justify-between text-sm font-semibold text-muted-foreground">
            <span>Border Radius</span>
            @if (themeService.radius() !== '0.625rem') {
              <button
                type="button"
                (click)="themeService.setRadius('0.625rem')"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset radius to default"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-5 gap-1.5">
            @for (rad of radiusOptions; track rad.value) {
              <button
                type="button"
                (click)="themeService.setRadius(rad.value)"
                class="flex items-center justify-center rounded-md border py-1 text-xs font-medium cursor-pointer transition-all hover:bg-accent"
                [class.border-primary]="themeService.radius() === rad.value"
                [class.bg-accent]="themeService.radius() === rad.value"
                [class.font-bold]="themeService.radius() === rad.value"
              >
                {{ rad.label }}
              </button>
            }
          </div>
        </div>

        <!-- 3. Theme Mode Section -->
        <div>
          <div class="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span>Theme Mode</span>
            @if (themeService.theme() !== themeService.defaultTheme) {
              <button
                type="button"
                (click)="themeService.resetTheme()"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset theme to default"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-3 gap-3">
            <!-- System -->
            <button
              type="button"
              (click)="themeService.setTheme('system')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="themeService.theme() === 'system'"
                [class.shadow-xl]="themeService.theme() === 'system'"
              >
                @if (themeService.theme() === 'system') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-theme-system class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">System</div>
            </button>

            <!-- Light -->
            <button
              type="button"
              (click)="themeService.setTheme('light')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="themeService.theme() === 'light'"
                [class.shadow-xl]="themeService.theme() === 'light'"
              >
                @if (themeService.theme() === 'light') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-theme-light class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Light</div>
            </button>

            <!-- Dark -->
            <button
              type="button"
              (click)="themeService.setTheme('dark')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="themeService.theme() === 'dark'"
                [class.shadow-xl]="themeService.theme() === 'dark'"
              >
                @if (themeService.theme() === 'dark') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-theme-dark class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Dark</div>
            </button>
          </div>
        </div>

        <!-- 4. Sidebar Style Section (Hidden on Mobile) -->
        <div class="max-md:hidden">
          <div class="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span>Sidebar</span>
            @if (layoutService.variant() !== layoutService.defaultVariant) {
              <button
                type="button"
                (click)="layoutService.setVariant(layoutService.defaultVariant)"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset sidebar to default"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-3 gap-3">
            <!-- Inset -->
            <button
              type="button"
              (click)="layoutService.setVariant('inset')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="layoutService.variant() === 'inset'"
                [class.shadow-xl]="layoutService.variant() === 'inset'"
              >
                @if (layoutService.variant() === 'inset') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-sidebar-inset class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Inset</div>
            </button>

            <!-- Floating -->
            <button
              type="button"
              (click)="layoutService.setVariant('floating')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="layoutService.variant() === 'floating'"
                [class.shadow-xl]="layoutService.variant() === 'floating'"
              >
                @if (layoutService.variant() === 'floating') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-sidebar-floating class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Floating</div>
            </button>

            <!-- Sidebar -->
            <button
              type="button"
              (click)="layoutService.setVariant('sidebar')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="layoutService.variant() === 'sidebar'"
                [class.shadow-xl]="layoutService.variant() === 'sidebar'"
              >
                @if (layoutService.variant() === 'sidebar') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-sidebar-sidebar class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Sidebar</div>
            </button>
          </div>
        </div>

        <!-- 5. Layout Mode Section (Hidden on Mobile) -->
        <div class="max-md:hidden">
          <div class="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span>Layout</span>
            @if (layoutService.layoutState() !== 'default') {
              <button
                type="button"
                (click)="resetLayoutState()"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset layout to default"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-3 gap-3">
            <!-- Default -->
            <button
              type="button"
              (click)="setLayoutMode('default')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="layoutService.sidebarOpen()"
                [class.shadow-xl]="layoutService.sidebarOpen()"
              >
                @if (layoutService.sidebarOpen()) {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-layout-default class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Default</div>
            </button>

            <!-- Compact -->
            <button
              type="button"
              (click)="setLayoutMode('icon')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="!layoutService.sidebarOpen() && layoutService.collapsible() === 'icon'"
                [class.shadow-xl]="!layoutService.sidebarOpen() && layoutService.collapsible() === 'icon'"
              >
                @if (!layoutService.sidebarOpen() && layoutService.collapsible() === 'icon') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-layout-compact class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Compact</div>
            </button>

            <!-- Full layout -->
            <button
              type="button"
              (click)="setLayoutMode('offcanvas')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="!layoutService.sidebarOpen() && layoutService.collapsible() === 'offcanvas'"
                [class.shadow-xl]="!layoutService.sidebarOpen() && layoutService.collapsible() === 'offcanvas'"
              >
                @if (!layoutService.sidebarOpen() && layoutService.collapsible() === 'offcanvas') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-layout-full class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Full layout</div>
            </button>
          </div>
        </div>

        <!-- 6. Text Direction Section -->
        <div>
          <div class="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <span>Direction</span>
            @if (directionService.dir() !== directionService.defaultDir) {
              <button
                type="button"
                (click)="directionService.resetDir()"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset direction to default"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-2 gap-3">
            <!-- LTR -->
            <button
              type="button"
              (click)="directionService.setDir('ltr')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="directionService.dir() === 'ltr'"
                [class.shadow-xl]="directionService.dir() === 'ltr'"
              >
                @if (directionService.dir() === 'ltr') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-dir direction="ltr" class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Left to Right</div>
            </button>

            <!-- RTL -->
            <button
              type="button"
              (click)="directionService.setDir('rtl')"
              class="group outline-none text-left cursor-pointer transition duration-200"
            >
              <div
                class="relative rounded-[6px] ring-1 ring-border p-0.5 transition-all"
                [class.ring-primary]="directionService.dir() === 'rtl'"
                [class.shadow-xl]="directionService.dir() === 'rtl'"
              >
                @if (directionService.dir() === 'rtl') {
                  <div class="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    <ng-icon name="lucideCheckCircle2" class="size-3.5" />
                  </div>
                }
                <app-icon-dir direction="rtl" class="w-full" />
              </div>
              <div class="mt-1.5 text-xs font-medium text-center">Right to Left</div>
            </button>
          </div>
        </div>

        <!-- 6. Workflow Navigation Bar Section -->
        <div>
          <div class="mb-2 flex items-center justify-between text-sm font-semibold text-muted-foreground">
            <span>Workflow Tabs Bar</span>
            @if (!layoutService.showWorkflowTabs()) {
              <button
                type="button"
                (click)="layoutService.setShowWorkflowTabs(true)"
                class="size-4 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label="Reset workflow tabs"
              >
                <ng-icon name="lucideRotateCcw" class="size-3" />
              </button>
            }
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              [disabled]="!appConfigService.allowUserCustomization()"
              (click)="layoutService.setShowWorkflowTabs(true)"
              class="flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium cursor-pointer transition-all hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              [class.border-primary]="layoutService.showWorkflowTabs()"
              [class.bg-accent]="layoutService.showWorkflowTabs()"
            >
              <ng-icon name="lucideEye" class="size-4 text-muted-foreground" />
              <span>Show Bar</span>
            </button>

            <button
              type="button"
              [disabled]="!appConfigService.allowUserCustomization()"
              (click)="layoutService.setShowWorkflowTabs(false)"
              class="flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium cursor-pointer transition-all hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              [class.border-primary]="!layoutService.showWorkflowTabs()"
              [class.bg-accent]="!layoutService.showWorkflowTabs()"
            >
              <ng-icon name="lucideEyeOff" class="size-4 text-muted-foreground" />
              <span>Hide Bar</span>
            </button>
          </div>
        </div>

        <!-- System Lock & Static App Config Status Banner -->
        @if (!appConfigService.allowUserCustomization()) {
          <div class="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
            <ng-icon name="lucideLock" class="size-4 shrink-0 mt-0.5" />
            <div>
              <span class="font-semibold block">System Customization Locked</span>
              Settings are locked by static <code class="font-mono text-[11px]">app-config.json</code> system policies.
            </div>
          </div>
        }

        <!-- 7. Live System Config JSON Generator Section -->
        <div class="space-y-2 border-t pt-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live System Config JSON</span>
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                (click)="copyJsonConfig()"
                class="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Copy app-config.json to clipboard"
              >
                @if (copied()) {
                  <ng-icon name="lucideCheck" class="size-3 text-emerald-500" />
                  <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                } @else {
                  <ng-icon name="lucideCopy" class="size-3" />
                  <span>Copy JSON</span>
                }
              </button>
              <button
                type="button"
                (click)="downloadJsonConfig()"
                class="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Download app-config.json file"
              >
                <ng-icon name="lucideDownload" class="size-3" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <pre class="max-h-44 overflow-y-auto rounded-lg border border-border/80 bg-zinc-950 p-3 font-mono text-[10.5px] leading-relaxed text-emerald-400 no-scrollbar select-all">
            <code>{{ currentConfigJson() }}</code>
          </pre>
        </div>
      </div>

      <!-- Footer Reset All Settings Button -->
      <div hlmSheetFooter class="border-t pt-4 mt-auto">
        <button
          hlmBtn
          variant="destructive"
          (click)="handleResetAll()"
          class="w-full cursor-pointer text-xs"
        >
          Reset All
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class ConfigDrawerComponent {
  readonly isOpen = signal<boolean>(false)
  readonly copied = signal<boolean>(false)

  readonly radiusOptions = [
    { label: '0', value: '0rem' },
    { label: '0.3', value: '0.3rem' },
    { label: '0.5', value: '0.5rem' },
    { label: '0.6', value: '0.625rem' },
    { label: '1.0', value: '1.0rem' },
  ]

  readonly currentConfigJson = computed(() => {
    return JSON.stringify(
      {
        name: 'Angular Shadcn Admin',
        version: '1.0.0',
        theme: {
          preset: this.themeService.preset(),
          radius: this.themeService.radius(),
          mode: this.themeService.theme(),
        },
        layout: {
          variant: this.layoutService.variant(),
          collapsible: this.layoutService.collapsible(),
          sidebarOpen: this.layoutService.sidebarOpen(),
          showWorkflowTabs: this.layoutService.showWorkflowTabs(),
        },
        direction: this.directionService.dir(),
        allowUserCustomization: this.appConfigService.allowUserCustomization(),
      },
      null,
      2
    )
  })

  constructor(
    public themeService: ThemeService,
    public layoutService: LayoutService,
    public directionService: DirectionService,
    public appConfigService: AppConfigService
  ) {}

  copyJsonConfig(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.currentConfigJson())
      this.copied.set(true)
      setTimeout(() => this.copied.set(false), 2000)
    }
  }

  downloadJsonConfig(): void {
    if (typeof window === 'undefined') return
    const blob = new Blob([this.currentConfigJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'app-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  setLayoutMode(mode: 'default' | 'icon' | 'offcanvas'): void {
    if (mode === 'default') {
      this.layoutService.setSidebarOpen(true)
    } else {
      this.layoutService.setSidebarOpen(false)
      this.layoutService.setCollapsible(mode)
    }
  }

  resetLayoutState(): void {
    this.layoutService.setSidebarOpen(true)
    this.layoutService.setCollapsible(this.layoutService.defaultCollapsible)
  }

  handleResetAll(): void {
    this.themeService.resetAll()
    this.layoutService.resetLayout()
    this.directionService.resetDir()
    this.isOpen.set(false)
  }
}
