import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideGraduationCap,
  lucideBookOpen,
  lucideAward,
  lucideVideo,
  lucidePlay,
  lucideCheck,
  lucideClock,
  lucideUsers,
  lucidePlus,
  lucideSearch,
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
import { toast } from 'ngx-sonner'

export interface CourseCard {
  id: string
  title: string
  category: string
  lessonsCount: number
  duration: string
  enrolledStudents: number
  completionRate: number
  imageUrl: string
}

@Component({
  selector: 'app-academy',
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
  ],
  providers: [
    provideIcons({
      lucideGraduationCap,
      lucideBookOpen,
      lucideAward,
      lucideVideo,
      lucidePlay,
      lucideCheck,
      lucideClock,
      lucideUsers,
      lucidePlus,
      lucideSearch,
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
          <h1 class="text-2xl font-bold tracking-tight text-foreground">Learning Academy & Developer LMS</h1>
          <p class="text-xs text-muted-foreground">Manage employee onboarding tracks, interactive coding modules, and certification credentials.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn size="sm" (click)="openCreateCourse()" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucidePlus" class="size-3.5" />
            <span>Create Course Track</span>
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Active Learners</span>
          <div class="text-2xl font-bold text-foreground">3,480 Students</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+240 enrolled this week</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Course Completion Rate</span>
          <div class="text-2xl font-bold text-foreground">78.5%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+6.2% improvement</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Certificates Issued</span>
          <div class="text-2xl font-bold text-foreground">1,240 Verified</div>
          <p class="text-[11px] text-sky-500 font-semibold">FIDO2 & SOC2 certified</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Avg Study Duration</span>
          <div class="text-2xl font-bold text-foreground">4.5 Hours</div>
          <p class="text-[11px] text-muted-foreground">Per completed track</p>
        </div>
      </div>

      <!-- Course Cards Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (course of courses(); track course.id) {
          <div
            hlmCard
            (click)="inspectCourse(course)"
            class="p-0 overflow-hidden group hover:border-primary/40 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
          >
            <div class="h-44 w-full bg-muted overflow-hidden relative">
              <img [src]="course.imageUrl" [alt]="course.title" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute top-2.5 right-2.5">
                <span hlmBadge variant="secondary" class="font-bold text-[10px]">{{ course.category }}</span>
              </div>
            </div>

            <div class="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {{ course.title }}
                </h3>
                <div class="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span>{{ course.lessonsCount }} Lessons</span>
                  <span>•</span>
                  <span>{{ course.duration }}</span>
                </div>
              </div>

              <!-- Completion Progress Bar -->
              <div class="space-y-1 pt-2 border-t border-border">
                <div class="flex justify-between text-[11px]">
                  <span class="text-muted-foreground">Class Average Completion</span>
                  <span class="font-bold text-foreground">{{ course.completionRate }}%</span>
                </div>
                <div class="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full" [style.width.%]="course.completionRate"></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </app-main>

    <!-- Course Inspector Sheet (size="md" = 1/2 screen width) -->
    <hlm-sheet [isOpen]="courseSheetOpen()" position="right" [size]="'md'" (closed)="courseSheetOpen.set(false)">
      @if (selectedCourse(); as c) {
        <div hlmSheetHeader>
          <div class="flex items-center justify-between">
            <h3 hlmSheetTitle>{{ c.title }}</h3>
            <span hlmBadge variant="outline" class="text-[10px] font-bold">{{ c.category }}</span>
          </div>
          <p hlmSheetDescription class="text-xs">{{ c.lessonsCount }} Interactive Modules • {{ c.duration }} total</p>
        </div>

        <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
          <div class="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <div class="font-bold text-foreground">Course Overview</div>
            <p class="text-muted-foreground leading-relaxed">
              Comprehensive curriculum covering architecture fundamentals, signals lifecycle, and production deployment best practices.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="font-bold text-foreground">Curriculum Outline</h4>
            <div class="divide-y divide-border border rounded-xl overflow-hidden">
              <div class="p-3 bg-card flex items-center justify-between">
                <div>
                  <div class="font-semibold text-foreground">Module 1: Signals Architecture</div>
                  <div class="text-[11px] text-muted-foreground">Computed expressions & effects</div>
                </div>
                <span class="font-mono text-emerald-600 font-bold">25 min</span>
              </div>
              <div class="p-3 bg-card flex items-center justify-between">
                <div>
                  <div class="font-semibold text-foreground">Module 2: Spartan UI Primitives</div>
                  <div class="text-[11px] text-muted-foreground">Accessible sheets, menus & dialogs</div>
                </div>
                <span class="font-mono text-emerald-600 font-bold">35 min</span>
              </div>
            </div>
          </div>
        </div>

        <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
          <button hlmBtn variant="outline" (click)="courseSheetOpen.set(false)" class="cursor-pointer text-xs">
            Close
          </button>
        </div>
      }
    </hlm-sheet>
  `,
})
export class AcademyComponent {
  readonly courseSheetOpen = signal<boolean>(false)
  readonly selectedCourse = signal<CourseCard | null>(null)

  readonly courses = signal<CourseCard[]>([
    {
      id: 'crs-1',
      title: 'Modern Angular 21 Architecture & Signals Deep Dive',
      category: 'Frontend Engineering',
      lessonsCount: 18,
      duration: '4.5 Hours',
      enrolledStudents: 1420,
      completionRate: 84,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 'crs-2',
      title: 'Zero-Trust Cloud Security & SOC2 Compliance Masterclass',
      category: 'DevSecOps',
      lessonsCount: 12,
      duration: '3.0 Hours',
      enrolledStudents: 980,
      completionRate: 72,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
    },
    {
      id: 'crs-3',
      title: 'Enterprise AI Agent Orchestration with RAG Pipelines',
      category: 'Artificial Intelligence',
      lessonsCount: 15,
      duration: '5.2 Hours',
      enrolledStudents: 1080,
      completionRate: 79,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
    },
  ])

  inspectCourse(c: CourseCard): void {
    this.selectedCourse.set(c)
    this.courseSheetOpen.set(true)
  }

  openCreateCourse(): void {
    toast.info('Course curriculum editor opened.')
  }
}
