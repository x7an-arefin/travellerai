import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCheck,
  lucideArrowRight,
  lucideArrowLeft,
  lucideSparkles,
  lucideBuilding,
  lucideUsers,
  lucidePackage,
  lucideRocket,
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
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { HlmSelectImports } from '../../ui/select/hlm-select.components'
import { HlmCheckboxImports } from '../../ui/checkbox/hlm-checkbox.component'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-wizard',
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
    ...HlmInputImports,
    ...HlmSelectImports,
    ...HlmCheckboxImports,
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideArrowRight,
      lucideArrowLeft,
      lucideSparkles,
      lucideBuilding,
      lucideUsers,
      lucidePackage,
      lucideRocket,
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
    <app-main [fixed]="true" class="space-y-6 max-w-4xl mx-auto py-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Project Onboarding Wizard</h1>
        <p class="text-xs text-muted-foreground">Configure your new organization workspace in 4 easy steps.</p>
      </div>

      <!-- Step Indicator Bar -->
      <div class="grid grid-cols-4 gap-2">
        @for (s of steps; track s.step) {
          <div
            (click)="setStep(s.step)"
            class="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card transition-all cursor-pointer select-none"
            [class.border-primary]="currentStep() === s.step"
            [class.bg-accent/40]="currentStep() === s.step"
          >
            <div
              class="flex size-7 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-colors"
              [class.bg-primary]="currentStep() >= s.step"
              [class.text-primary-foreground]="currentStep() >= s.step"
              [class.bg-muted]="currentStep() < s.step"
              [class.text-muted-foreground]="currentStep() < s.step"
            >
              @if (currentStep() > s.step) {
                <ng-icon name="lucideCheck" class="size-3.5" />
              } @else {
                <span>{{ s.step }}</span>
              }
            </div>
            <div class="hidden sm:block min-w-0">
              <p class="text-xs font-semibold text-foreground truncate">{{ s.title }}</p>
            </div>
          </div>
        }
      </div>

      <!-- Main Step Form & Live Preview Grid -->
      <div class="grid gap-6 md:grid-cols-5">
        <!-- Left: Active Step Form -->
        <div hlmCard class="p-6 md:col-span-3 space-y-4">
          <!-- Step 1: Workspace Info -->
          @if (currentStep() === 1) {
            <div class="space-y-4 animate-in fade-in-0 duration-200">
              <div class="space-y-1">
                <h3 class="text-base font-bold text-foreground">1. Workspace Details</h3>
                <p class="text-xs text-muted-foreground">Set your organization name and primary URL handle.</p>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-muted-foreground">Workspace Name</label>
                <input hlmInput [(ngModel)]="workspaceName" placeholder="e.g. Acme Innovations" />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-muted-foreground">Workspace URL Slug</label>
                <div class="flex items-center rounded-md border border-input bg-background pl-3">
                  <span class="text-xs text-muted-foreground">app.acme.com/</span>
                  <input
                    type="text"
                    [(ngModel)]="workspaceSlug"
                    placeholder="acme-corp"
                    class="h-9 w-full bg-transparent px-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-muted-foreground">Organization Size</label>
                <hlm-custom-select
                  [options]="sizeOptions"
                  [(ngModel)]="companySize"
                  placeholder="Select company size"
                />
              </div>
            </div>
          }

          <!-- Step 2: Team Members -->
          @if (currentStep() === 2) {
            <div class="space-y-4 animate-in fade-in-0 duration-200">
              <div class="space-y-1">
                <h3 class="text-base font-bold text-foreground">2. Invite Initial Members</h3>
                <p class="text-xs text-muted-foreground">Collaborators will receive access to your sprint backlog.</p>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-muted-foreground">Teammate Email</label>
                <input hlmInput [(ngModel)]="teamEmail" placeholder="colleague@example.com" />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-muted-foreground">Default Role</label>
                <hlm-custom-select
                  [options]="roleOptions"
                  [(ngModel)]="teamRole"
                  placeholder="Select member role"
                />
              </div>
            </div>
          }

          <!-- Step 3: Integrations -->
          @if (currentStep() === 3) {
            <div class="space-y-4 animate-in fade-in-0 duration-200">
              <div class="space-y-1">
                <h3 class="text-base font-bold text-foreground">3. Connect Tooling</h3>
                <p class="text-xs text-muted-foreground">Select external services you wish to sync.</p>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                  <div class="flex items-center gap-2.5">
                    <hlm-checkbox [isChecked]="connectGithub" (checkedChange)="connectGithub = $event" />
                    <span class="text-xs font-semibold">GitHub Integration</span>
                  </div>
                  <span hlmBadge variant="outline" class="text-[10px]">Code</span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                  <div class="flex items-center gap-2.5">
                    <hlm-checkbox [isChecked]="connectSlack" (checkedChange)="connectSlack = $event" />
                    <span class="text-xs font-semibold">Slack Alerts</span>
                  </div>
                  <span hlmBadge variant="outline" class="text-[10px]">Chat</span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
                  <div class="flex items-center gap-2.5">
                    <hlm-checkbox [isChecked]="connectFigma" (checkedChange)="connectFigma = $event" />
                    <span class="text-xs font-semibold">Figma Assets</span>
                  </div>
                  <span hlmBadge variant="outline" class="text-[10px]">Design</span>
                </div>
              </div>
            </div>
          }

          <!-- Step 4: Ready to Launch -->
          @if (currentStep() === 4) {
            <div class="space-y-4 animate-in fade-in-0 duration-200 text-center py-4">
              <div class="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-xs">
                <ng-icon name="lucideRocket" class="size-7" />
              </div>
              <h3 class="text-lg font-bold text-foreground">You're All Set!</h3>
              <p class="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Your organization workspace <strong class="text-foreground">{{ workspaceName }}</strong> has been configured with all initial tools and roles.
              </p>
            </div>
          }

          <!-- Stepper Footer Navigation Buttons -->
          <div class="flex items-center justify-between pt-4 border-t border-border mt-4">
            <button
              hlmBtn
              variant="outline"
              size="sm"
              [disabled]="currentStep() === 1"
              (click)="prevStep()"
              class="gap-1.5 cursor-pointer text-xs"
            >
              <ng-icon name="lucideArrowLeft" class="size-3.5" />
              <span>Back</span>
            </button>

            @if (currentStep() < 4) {
              <button
                hlmBtn
                size="sm"
                (click)="nextStep()"
                class="gap-1.5 cursor-pointer text-xs shadow-xs"
              >
                <span>Continue</span>
                <ng-icon name="lucideArrowRight" class="size-3.5" />
              </button>
            } @else {
              <button
                hlmBtn
                size="sm"
                (click)="finishWizard()"
                class="gap-1.5 cursor-pointer text-xs shadow-md"
              >
                <span>Launch Workspace</span>
                <ng-icon name="lucideSparkles" class="size-3.5" />
              </button>
            }
          </div>
        </div>

        <!-- Right: Real-time Live Summary Preview Card -->
        <div hlmCard class="p-6 md:col-span-2 space-y-4 bg-muted/20 justify-between">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Summary</h4>
            <div class="mt-4 space-y-3 text-xs">
              <div class="flex justify-between py-1 border-b border-border/60">
                <span class="text-muted-foreground">Workspace:</span>
                <span class="font-semibold text-foreground truncate max-w-[140px]">{{ workspaceName || 'Acme' }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/60">
                <span class="text-muted-foreground">URL Slug:</span>
                <span class="font-mono text-[11px] text-primary">/{{ workspaceSlug || 'acme' }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/60">
                <span class="text-muted-foreground">Company Size:</span>
                <span class="font-medium text-foreground">{{ companySize }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/60">
                <span class="text-muted-foreground">Team Member:</span>
                <span class="font-medium text-foreground truncate max-w-[140px]">{{ teamEmail || 'None added' }}</span>
              </div>
              <div class="flex justify-between py-1 border-b border-border/60">
                <span class="text-muted-foreground">Tools Synced:</span>
                <span class="font-semibold text-foreground">
                  {{ (connectGithub ? 1 : 0) + (connectSlack ? 1 : 0) + (connectFigma ? 1 : 0) }} Connected
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-primary/20 bg-primary/5 p-3 text-[11px] text-muted-foreground">
            Inputs are validated in real-time.
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class WizardComponent {
  readonly currentStep = signal<number>(1)

  workspaceName = 'Acme Innovations'
  workspaceSlug = 'acme-innovations'
  companySize: any = '11-50'

  teamEmail = 'sarah.miller@email.com'
  teamRole: any = 'manager'

  connectGithub = true
  connectSlack = true
  connectFigma = false

  readonly steps = [
    { step: 1, title: 'Workspace' },
    { step: 2, title: 'Team Setup' },
    { step: 3, title: 'Integrations' },
    { step: 4, title: 'Launch' },
  ]

  readonly sizeOptions = [
    { label: '1 - 10 Employees', value: '1-10' },
    { label: '11 - 50 Employees', value: '11-50' },
    { label: '51 - 250 Employees', value: '51-250' },
    { label: '250+ Enterprise', value: '250+' },
  ]

  readonly roleOptions = [
    { label: 'Manager', value: 'manager' },
    { label: 'Admin', value: 'admin' },
    { label: 'Developer / Member', value: 'member' },
  ]

  constructor(private router: Router) {}

  setStep(s: number): void {
    if (s <= this.currentStep()) {
      this.currentStep.set(s)
    }
  }

  nextStep(): void {
    this.currentStep.update((s) => Math.min(4, s + 1))
  }

  prevStep(): void {
    this.currentStep.update((s) => Math.max(1, s - 1))
  }

  finishWizard(): void {
    toast.success('Workspace configured successfully! Welcome aboard.')
    this.router.navigate(['/'])
  }
}
