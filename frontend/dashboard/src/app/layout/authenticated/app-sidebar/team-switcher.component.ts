import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideCommand,
  lucideGalleryVerticalEnd,
  lucideAudioWaveform,
  lucideChevronsUpDown,
  lucidePlus,
  lucideUsers,
  lucideUserCheck,
  lucideShield,
  lucideCreditCard,
  lucideBuilding2,
  lucideNetwork,
  lucideCheck,
} from '@ng-icons/lucide'
import { Team } from '../data/layout.types'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { LayoutService } from '@core/services/layout.service'
import { AuthService } from '@core/services/auth.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-team-switcher',
  standalone: true,
  imports: [CommonModule, NgIcon, ...HlmMenuImports],
  providers: [
    provideIcons({
      lucideCommand,
      lucideGalleryVerticalEnd,
      lucideAudioWaveform,
      lucideChevronsUpDown,
      lucidePlus,
      lucideUsers,
      lucideUserCheck,
      lucideShield,
      lucideCreditCard,
      lucideBuilding2,
      lucideNetwork,
      lucideCheck,
    }),
  ],
  template: `
    <hlm-dropdown-menu alignment="start" class="w-full">
      <button
        hlmMenuTrigger
        type="button"
        class="flex h-10 w-full items-center gap-3 rounded-lg px-2 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring min-w-0 cursor-pointer"
        [class.justify-center]="!layoutService.sidebarOpen()"
        [class.px-0]="!layoutService.sidebarOpen()"
      >
        <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-xs">
          <ng-icon [name]="activeTeam().logo" class="size-4 shrink-0" />
        </div>
        @if (layoutService.sidebarOpen()) {
          <div class="grid flex-1 text-left text-xs leading-tight min-w-0 overflow-hidden">
            <span class="truncate font-semibold text-sidebar-foreground">{{ activeTeam().name }}</span>
            <span class="truncate text-muted-foreground text-[11px]">{{ activeTeam().plan }}</span>
          </div>
          <ng-icon name="lucideChevronsUpDown" class="size-4 text-muted-foreground ml-auto shrink-0" />
        }
      </button>

      <div class="w-60 max-w-[calc(100vw-2rem)] space-y-0.5">
        <div hlmMenuLabel class="text-xs font-semibold text-muted-foreground px-2 py-1">Workspaces & Operators</div>
        @for (team of teams; track team.name) {
          <button
            hlmMenuItem
            (click)="selectTeam(team)"
            class="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer min-w-0 w-full"
            [class.bg-muted/60]="activeTeam().name === team.name"
          >
            <div class="flex size-6 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/30">
              <ng-icon [name]="team.logo" class="size-3.5 shrink-0" />
            </div>
            <div class="flex flex-col flex-1 text-left min-w-0">
              <span class="truncate font-medium text-foreground">{{ team.name }}</span>
              <span class="text-[10px] text-muted-foreground truncate">{{ team.plan }}</span>
            </div>
            @if (activeTeam().name === team.name) {
              <ng-icon name="lucideCheck" class="size-3.5 text-primary shrink-0 ml-1" />
            }
          </button>
        }
        <div hlmMenuSeparator class="my-1"></div>
        <button (click)="openAddTeamModal()" hlmMenuItem class="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer min-w-0 w-full">
          <div class="flex size-6 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-background">
            <ng-icon name="lucidePlus" class="size-3.5 shrink-0 text-muted-foreground" />
          </div>
          <span class="font-medium text-muted-foreground truncate">Add agency workspace</span>
        </button>
      </div>
    </hlm-dropdown-menu>
  `,
})
export class TeamSwitcherComponent implements OnInit, OnChanges {
  @Input() teams: Team[] = []
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)

  readonly activeTeam = signal<Team>({
    name: 'Traveller AI Global',
    logo: 'lucideCommand',
    plan: 'Multi-Provider Marketplace',
  })

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.syncInitialTeam()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teams'] && this.teams?.length) {
      this.syncInitialTeam()
    }
  }

  private syncInitialTeam(): void {
    if (!this.teams || !this.teams.length) return

    const user = this.auth.user()
    if (user?.email === 'elena@alpineadventures.com') {
      const elenaTeam = this.teams.find((t) => t.name.includes('Alpine'))
      if (elenaTeam) {
        this.activeTeam.set(elenaTeam)
        return
      }
    }

    const saved = localStorage.getItem('traveller_active_workspace')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const match = this.teams.find((t) => t.name === parsed.name)
        if (match) {
          this.activeTeam.set(match)
          return
        }
      } catch {}
    }

    this.activeTeam.set(this.teams[0])
  }

  selectTeam(team: Team): void {
    this.activeTeam.set(team)
    localStorage.setItem('traveller_active_workspace', JSON.stringify(team))
    toast.success(`Switched to "${team.name}" workspace`)

    // Redirect to main landing route / dashboard based on role and workspace context
    const targetRoute = this.auth.getDefaultRouteForRole()
    this.router.navigateByUrl(targetRoute)
  }

  openAddTeamModal(): void {
    this.router.navigate(['/workspaces'], { queryParams: { action: 'create' } })
  }
}

