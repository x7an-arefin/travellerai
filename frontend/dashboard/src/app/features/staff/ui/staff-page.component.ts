import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucidePlus,
  lucideSearch,
  lucideUsers,
  lucideUserPlus,
  lucideCompass,
  lucideShield,
} from '@ng-icons/lucide'
import { StaffFacade } from '../data-access/staff.facade'
import { StaffGuidesTableComponent } from './staff-guides-table.component'
import { StaffMembersTableComponent } from './staff-members-table.component'
import { StaffGuideFormComponent } from './staff-guide-form.component'
import { StaffInviteFormComponent } from './staff-invite-form.component'
import { HeaderComponent } from '../../../layout/authenticated/header/header.component'
import { MainComponent } from '../../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmSheetImports } from '../../../ui/sheet/hlm-sheet.components'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../../ui/badge/hlm-badge.directive'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-staff-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    HeaderComponent,
    MainComponent,
    TopNavComponent,
    SearchComponent,
    ThemeSwitchComponent,
    NotificationCenterComponent,
    ProfileDropdownComponent,
    StaffGuidesTableComponent,
    StaffMembersTableComponent,
    StaffGuideFormComponent,
    StaffInviteFormComponent,
    ...HlmSheetImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
  ],
  providers: [
    provideIcons({
      lucidePlus,
      lucideSearch,
      lucideUsers,
      lucideUserPlus,
      lucideCompass,
      lucideShield,
    }),
  ],
  template: `
    <!-- Top Header -->
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <!-- Main Content -->
    <app-main>
      <!-- Page Header -->
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">Guides & Operational Team</h1>
            <span hlmBadge variant="outline" class="text-xs">
              {{ facade.allGuides().length }} Guides · {{ facade.allStaff().length }} Staff
            </span>
          </div>
          <p class="text-xs text-muted-foreground mt-0.5">
            Manage certified tour guides, lead naturalists, and internal agency staff role permissions.
          </p>
        </div>

        <div class="flex items-center gap-2">
          @if (facade.activeTab() === 'guides') {
            <button
              hlmBtn
              variant="default"
              size="sm"
              class="gap-1.5 cursor-pointer h-9 shadow-xs"
              (click)="facade.openAddGuideDrawer()"
            >
              <ng-icon name="lucidePlus" class="size-4" />
              <span>Register Guide</span>
            </button>
          } @else {
            <button
              hlmBtn
              variant="default"
              size="sm"
              class="gap-1.5 cursor-pointer h-9 shadow-xs"
              (click)="facade.openInviteStaffDrawer()"
            >
              <ng-icon name="lucideUserPlus" class="size-4" />
              <span>Invite Staff</span>
            </button>
          }
        </div>
      </div>

      <!-- Tab Switcher & Search Bar -->
      <div class="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative w-full sm:w-72">
          <ng-icon
            name="lucideSearch"
            class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search team member or language..."
            [ngModel]="facade.searchQuery()"
            (ngModelChange)="facade.setSearchQuery($event)"
            class="w-full rounded-md border border-input bg-card pl-8.5 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
          />
        </div>

        <!-- Section Tabs -->
        <div class="flex items-center gap-1.5">
          <button
            hlmBtn
            [variant]="facade.activeTab() === 'guides' ? 'default' : 'ghost'"
            size="sm"
            class="h-8 text-xs gap-1.5 cursor-pointer"
            (click)="facade.setActiveTab('guides')"
          >
            <ng-icon name="lucideCompass" class="size-3.5" />
            <span>Tour Guides ({{ facade.allGuides().length }})</span>
          </button>
          <button
            hlmBtn
            [variant]="facade.activeTab() === 'staff' ? 'default' : 'ghost'"
            size="sm"
            class="h-8 text-xs gap-1.5 cursor-pointer"
            (click)="facade.setActiveTab('staff')"
          >
            <ng-icon name="lucideShield" class="size-3.5" />
            <span>Agency Staff ({{ facade.allStaff().length }})</span>
          </button>
        </div>
      </div>

      <!-- Active Table View -->
      @if (facade.activeTab() === 'guides') {
        <app-staff-guides-table
          [items]="facade.guides()"
          (delete)="onDeleteGuide($event)"
        />
      } @else {
        <app-staff-members-table [items]="facade.staff()" />
      }
    </app-main>

    <!-- Slide-over Drawer for Register/Invite -->
    <hlm-sheet [isOpen]="facade.isDrawerOpen()" (closed)="facade.closeDrawer()" sheetSize="md" side="right">
      <div class="h-full flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          <div class="pb-3 border-b border-border/40 mb-4">
            <h3 class="text-base font-bold text-foreground">
              {{ facade.drawerMode() === 'add-guide' ? 'Register Tour Guide' : 'Invite Agency Staff Member' }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">
              {{ facade.drawerMode() === 'add-guide' ? 'Create a certified guide profile for departure assignments and check-in rights.' : 'Invite a team member with specific role permissions.' }}
            </p>
          </div>

          <div class="py-2">
            @if (facade.drawerMode() === 'add-guide') {
              <app-staff-guide-form
                (save)="onSaveGuide($event)"
                (cancel)="facade.closeDrawer()"
              />
            } @else if (facade.drawerMode() === 'invite-staff') {
              <app-staff-invite-form
                (save)="onSaveStaff($event)"
                (cancel)="facade.closeDrawer()"
              />
            }
          </div>
        </div>
      </div>
    </hlm-sheet>
  `,
})
export class StaffPageComponent implements OnInit {
  readonly facade = inject(StaffFacade)

  ngOnInit(): void {
    this.facade.loadStaffData()
  }

  async onSaveGuide(dto: any): Promise<void> {
    const ok = await this.facade.createGuide(dto)
    if (ok) toast.success('Tour guide registered successfully!')
    else toast.error('Failed to register guide.')
  }

  async onSaveStaff(dto: any): Promise<void> {
    const ok = await this.facade.inviteStaff(dto)
    if (ok) toast.success('Staff invitation sent!')
    else toast.error('Failed to invite staff.')
  }

  async onDeleteGuide(id: string): Promise<void> {
    const ok = await this.facade.removeGuide(id)
    if (ok) toast.success('Guide profile removed.')
    else toast.error('Failed to remove guide.')
  }
}
