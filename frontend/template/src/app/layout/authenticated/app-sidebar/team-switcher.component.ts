import { Component, Input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
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
} from '@ng-icons/lucide'
import { Team } from '../data/layout.types'
import { HlmMenuImports } from '@ui/dropdown-menu/hlm-menu.components'
import { LayoutService } from '@core/services/layout.service'

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

      <div class="w-56 max-w-[calc(100vw-2rem)] space-y-0.5">
        <div hlmMenuLabel class="text-xs font-semibold text-muted-foreground px-2 py-1">Teams</div>
        @for (team of teams; track team.name) {
          <button
            hlmMenuItem
            (click)="selectTeam(team)"
            class="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer min-w-0 w-full"
          >
            <div class="flex size-6 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/30">
              <ng-icon [name]="team.logo" class="size-3.5 shrink-0" />
            </div>
            <span class="truncate flex-1 text-left font-medium">{{ team.name }}</span>
            <span class="text-[11px] text-muted-foreground shrink-0 ml-auto">{{ team.plan }}</span>
          </button>
        }
        <div hlmMenuSeparator class="my-1"></div>
        <button hlmMenuItem class="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer min-w-0 w-full">
          <div class="flex size-6 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-background">
            <ng-icon name="lucidePlus" class="size-3.5 shrink-0 text-muted-foreground" />
          </div>
          <span class="font-medium text-muted-foreground truncate">Add team</span>
        </button>
      </div>
    </hlm-dropdown-menu>
  `,
})
export class TeamSwitcherComponent {
  @Input() teams: Team[] = []
  readonly activeTeam = signal<Team>({
    name: 'Shadcn Admin',
    logo: 'lucideCommand',
    plan: 'Angular + Spartan UI',
  })

  constructor(public layoutService: LayoutService) {}

  selectTeam(team: Team): void {
    this.activeTeam.set(team)
  }
}
