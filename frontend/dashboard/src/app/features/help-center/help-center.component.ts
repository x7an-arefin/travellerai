import { Component, signal, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { TicketsApiService } from '../tickets/data-access/services/tickets-api.service'
import {
  lucideSearch,
  lucideBook,
  lucideCode,
  lucideLifeBuoy,
  lucideMessageSquare,
  lucideArrowRight,
  lucideExternalLink,
  lucidePlay,
  lucideChevronDown,
  lucideChevronUp,
  lucideCheckCircle2,
  lucideX,
  lucideSend,
  lucideBot,
  lucideStar,
  lucideThumbsUp,
  lucideThumbsDown,
  lucideZap,
  lucideBookOpen,
  lucideGraduationCap,
  lucideFileText,
  lucideAlertCircle,
  lucideHeadphones,
} from '@ng-icons/lucide'
import { HeaderComponent } from '../../layout/authenticated/header/header.component'
import { MainComponent } from '../../layout/authenticated/main/main.component'
import { TopNavComponent } from '../../layout/authenticated/top-nav/top-nav.component'
import { SearchComponent } from '../../shared/components/search/search.component'
import { ThemeSwitchComponent } from '../../shared/components/theme-switch/theme-switch.component'
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center.component'
import { ProfileDropdownComponent } from '../../shared/components/profile-dropdown/profile-dropdown.component'
import { HlmCardImports } from '../../ui/card/hlm-card.directives'
import { HlmButtonImports } from '../../ui/button/hlm-button.directive'
import { HlmBadgeImports } from '../../ui/badge/hlm-badge.directive'
import { HlmInputImports } from '../../ui/input/hlm-input.directive'
import { toast } from 'ngx-sonner'

interface HelpArticle {
  id: string
  title: string
  category: string
  description: string
  views: number
  helpful: number
  tags: string[]
}

interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
  isOpen: boolean
}

interface SupportMessage {
  id: string
  sender: 'user' | 'agent'
  content: string
  time: string
}

interface VideoTutorial {
  id: string
  title: string
  duration: string
  category: string
  thumbnail: string
}

@Component({
  selector: 'app-help-center',
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
    ...HlmCardImports,
    ...HlmButtonImports,
    ...HlmBadgeImports,
    ...HlmInputImports,
  ],
  providers: [
    provideIcons({
      lucideSearch,
      lucideBook,
      lucideCode,
      lucideLifeBuoy,
      lucideMessageSquare,
      lucideArrowRight,
      lucideExternalLink,
      lucidePlay,
      lucideChevronDown,
      lucideChevronUp,
      lucideCheckCircle2,
      lucideX,
      lucideSend,
      lucideBot,
      lucideStar,
      lucideThumbsUp,
      lucideThumbsDown,
      lucideZap,
      lucideBookOpen,
      lucideGraduationCap,
      lucideFileText,
      lucideAlertCircle,
      lucideHeadphones,
    }),
  ],
  template: `
    <app-header [fixed]="true">
      <app-top-nav class="mr-auto" />
      <div class="flex items-center gap-2">
        <app-search />
        <app-theme-switch />
        <app-notification-center />
        <app-profile-dropdown />
      </div>
    </app-header>

    <app-main>

      <!-- Hero Search Banner -->
      <div class="mb-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 md:p-8">
        <div class="max-w-2xl">
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
            How can we help you?
          </h1>
          <p class="text-sm text-muted-foreground mb-4">
            Search our knowledge base, browse guides, or start a live support chat with our travel operations team.
          </p>
          <div class="relative max-w-xl">
            <ng-icon name="lucideSearch" class="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              hlmInput
              type="text"
              [(ngModel)]="globalSearch"
              placeholder="Search articles, guides, API docs..."
              class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl shadow-sm"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-3">
            <span class="text-xs text-muted-foreground">Popular:</span>
            @for (tag of popularSearches; track tag) {
              <button
                type="button"
                (click)="globalSearch = tag"
                class="text-xs px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              >
                {{ tag }}
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Quick Stats Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        @for (stat of quickStats; track stat.label) {
          <div hlmCard class="p-4 flex items-center gap-3 shadow-xs">
            <div class="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ng-icon [name]="stat.icon" class="size-4 text-primary" />
            </div>
            <div>
              <div class="text-lg font-bold text-foreground leading-tight">{{ stat.value }}</div>
              <div class="text-[10px] text-muted-foreground">{{ stat.label }}</div>
            </div>
          </div>
        }
      </div>

      <!-- Category Nav Tabs -->
      <div class="mb-5 flex items-center gap-1 overflow-x-auto pb-1">
        @for (cat of categories; track cat.id) {
          <button
            type="button"
            (click)="activeCategory.set(cat.id)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer whitespace-nowrap"
            [class.bg-primary]="activeCategory() === cat.id"
            [class.text-primary-foreground]="activeCategory() === cat.id"
            [class.text-muted-foreground]="activeCategory() !== cat.id"
            [class.hover:bg-muted]="activeCategory() !== cat.id"
          >
            <ng-icon [name]="cat.icon" class="size-3.5" />
            {{ cat.label }}
          </button>
        }
      </div>

      <div class="grid gap-5 lg:grid-cols-3">

        <!-- Left Column: Articles + FAQs -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Knowledge Base Articles -->
          <div hlmCard class="shadow-xs overflow-hidden">
            <div class="px-4 py-3 border-b border-border/40 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <ng-icon name="lucideBookOpen" class="size-4 text-primary" />
                <h2 class="text-sm font-semibold text-foreground">Knowledge Base</h2>
                <span hlmBadge variant="secondary" class="text-[10px]">{{ filteredArticles().length }} articles</span>
              </div>
              <button hlmBtn variant="ghost" size="sm" class="text-xs gap-1 cursor-pointer" (click)="viewAll()">
                View all <ng-icon name="lucideArrowRight" class="size-3" />
              </button>
            </div>
            <div class="divide-y divide-border/30">
              @for (article of filteredArticles(); track article.id) {
                <div class="px-4 py-3 hover:bg-muted/30 transition-colors group cursor-pointer" (click)="openArticle(article)">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-0.5">
                        <span hlmBadge variant="outline" class="text-[10px] shrink-0">{{ article.category }}</span>
                        @for (tag of article.tags.slice(0, 2); track tag) {
                          <span class="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{{ tag }}</span>
                        }
                      </div>
                      <h3 class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {{ article.title }}
                      </h3>
                      <p class="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{{ article.description }}</p>
                    </div>
                    <div class="shrink-0 text-right">
                      <div class="text-[10px] text-muted-foreground font-mono">{{ article.views | number }} views</div>
                      <div class="flex items-center gap-1 text-[10px] text-emerald-600 mt-0.5 justify-end">
                        <ng-icon name="lucideThumbsUp" class="size-2.5" />
                        {{ article.helpful }}%
                      </div>
                    </div>
                  </div>
                </div>
              }
              @if (filteredArticles().length === 0) {
                <div class="py-10 text-center">
                  <ng-icon name="lucideSearch" class="size-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p class="text-xs text-muted-foreground">No articles match your search.</p>
                  <button hlmBtn variant="outline" size="sm" class="mt-2 text-xs cursor-pointer" (click)="globalSearch = ''">
                    Clear search
                  </button>
                </div>
              }
            </div>
          </div>

          <!-- FAQ Accordion -->
          <div hlmCard class="shadow-xs overflow-hidden">
            <div class="px-4 py-3 border-b border-border/40 flex items-center gap-2">
              <ng-icon name="lucideAlertCircle" class="size-4 text-primary" />
              <h2 class="text-sm font-semibold text-foreground">Frequently Asked Questions</h2>
            </div>
            <div class="divide-y divide-border/30 p-1">
              @for (faq of filteredFaqs(); track faq.id) {
                <div class="rounded-lg overflow-hidden">
                  <button
                    type="button"
                    (click)="toggleFaq(faq.id)"
                    class="w-full flex items-center justify-between gap-3 px-3 py-3 text-left hover:bg-muted/40 transition-colors cursor-pointer rounded-lg"
                  >
                    <span class="text-xs font-medium text-foreground flex-1">{{ faq.question }}</span>
                    <ng-icon
                      [name]="faq.isOpen ? 'lucideChevronUp' : 'lucideChevronDown'"
                      class="size-3.5 text-muted-foreground shrink-0"
                    />
                  </button>
                  @if (faq.isOpen) {
                    <div class="px-3 pb-3 text-xs text-muted-foreground leading-relaxed animate-in fade-in-0 slide-in-from-top-1">
                      {{ faq.answer }}
                      <div class="flex items-center gap-2 mt-2 pt-2 border-t border-border/30">
                        <span class="text-[10px] text-muted-foreground">Was this helpful?</span>
                        <button type="button" (click)="rateHelpful(faq.id, true)" class="flex items-center gap-1 text-[10px] text-emerald-600 hover:underline cursor-pointer">
                          <ng-icon name="lucideThumbsUp" class="size-3" /> Yes
                        </button>
                        <button type="button" (click)="rateHelpful(faq.id, false)" class="flex items-center gap-1 text-[10px] text-rose-500 hover:underline cursor-pointer">
                          <ng-icon name="lucideThumbsDown" class="size-3" /> No
                        </button>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Video Tutorials -->
          <div hlmCard class="shadow-xs overflow-hidden">
            <div class="px-4 py-3 border-b border-border/40 flex items-center gap-2">
              <ng-icon name="lucideGraduationCap" class="size-4 text-primary" />
              <h2 class="text-sm font-semibold text-foreground">Video Tutorials</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
              @for (video of videoTutorials; track video.id) {
                <div
                  class="group relative rounded-xl overflow-hidden border border-border/40 cursor-pointer hover:border-primary/40 transition-all"
                  (click)="playVideo(video)"
                >
                  <div class="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-60"></div>
                    <div class="size-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ng-icon name="lucidePlay" class="size-4 text-white fill-white" />
                    </div>
                    <div class="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      {{ video.duration }}
                    </div>
                  </div>
                  <div class="p-2.5">
                    <span hlmBadge variant="outline" class="text-[9px] mb-1">{{ video.category }}</span>
                    <p class="text-xs font-medium text-foreground line-clamp-2 leading-tight">{{ video.title }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Right Column: Live Support + Contact -->
        <div class="space-y-5">

          <!-- Live Support Chat -->
          <div hlmCard class="shadow-xs overflow-hidden flex flex-col" style="height: 420px;">
            <div class="px-4 py-3 border-b border-border/40 flex items-center justify-between shrink-0">
              <div class="flex items-center gap-2">
                <div class="relative">
                  <ng-icon name="lucideHeadphones" class="size-4 text-primary" />
                  <span class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-1 ring-card"></span>
                </div>
                <h2 class="text-sm font-semibold text-foreground">Live Support</h2>
              </div>
              <span hlmBadge variant="outline" class="text-[10px] text-emerald-600 bg-emerald-500/10 border-emerald-500/30">
                2 agents online
              </span>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-3 space-y-2.5">
              @for (msg of chatMessages(); track msg.id) {
                <div [class.flex-row-reverse]="msg.sender === 'user'" class="flex gap-2 items-end">
                  @if (msg.sender === 'agent') {
                    <div class="size-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                      <ng-icon name="lucideBot" class="size-3 text-primary" />
                    </div>
                  }
                  <div
                    class="max-w-[78%] rounded-xl px-3 py-2 text-[11px] leading-relaxed"
                    [class.bg-primary]="msg.sender === 'user'"
                    [class.text-primary-foreground]="msg.sender === 'user'"
                    [class.bg-muted]="msg.sender === 'agent'"
                    [class.text-foreground]="msg.sender === 'agent'"
                  >
                    {{ msg.content }}
                    <div class="text-[9px] mt-1 opacity-60">{{ msg.time }}</div>
                  </div>
                </div>
              }
              @if (agentTyping()) {
                <div class="flex gap-2 items-end">
                  <div class="size-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <ng-icon name="lucideBot" class="size-3 text-primary" />
                  </div>
                  <div class="bg-muted rounded-xl px-3 py-2 flex items-center gap-1">
                    <span class="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]"></span>
                    <span class="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]"></span>
                    <span class="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce"></span>
                  </div>
                </div>
              }
            </div>

            <!-- Input -->
            <div class="px-3 py-2.5 border-t border-border/40 flex items-center gap-2 shrink-0">
              <input
                hlmInput
                type="text"
                [(ngModel)]="chatInput"
                placeholder="Ask a question..."
                (keyup.enter)="sendChatMessage()"
                class="flex-1 text-xs h-8 rounded-lg"
              />
              <button
                hlmBtn
                variant="default"
                size="icon"
                class="size-8 shrink-0 cursor-pointer"
                (click)="sendChatMessage()"
              >
                <ng-icon name="lucideSend" class="size-3.5" />
              </button>
            </div>
          </div>

          <!-- Submit Support Ticket -->
          <div hlmCard class="shadow-xs overflow-hidden">
            <div class="px-4 py-3 border-b border-border/40 flex items-center gap-2">
              <ng-icon name="lucideFileText" class="size-4 text-primary" />
              <h2 class="text-sm font-semibold text-foreground">Submit a Ticket</h2>
            </div>
            <div class="p-4 space-y-3">
              <div class="space-y-1">
                <label class="text-xs font-medium text-foreground">Subject</label>
                <input hlmInput [(ngModel)]="ticketSubject" placeholder="Describe your issue briefly" class="w-full text-xs" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-medium text-foreground">Category</label>
                <select
                  [(ngModel)]="ticketCategory"
                  class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select category...</option>
                  <option>Hotel Reservation Issue</option>
                  <option>Vehicle Booking Problem</option>
                  <option>Payment & Billing</option>
                  <option>Account & Access</option>
                  <option>API & Integrations</option>
                  <option>Feature Request</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-medium text-foreground">Description</label>
                <textarea
                  [(ngModel)]="ticketDescription"
                  placeholder="Provide detailed information, error codes, and steps to reproduce..."
                  rows="4"
                  class="w-full px-3 py-2 rounded-md border border-border bg-background text-xs text-foreground outline-none focus:ring-2 focus:ring-ring resize-none"
                ></textarea>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-medium text-foreground">Priority</label>
                <div class="flex items-center gap-2">
                  @for (p of ['Low', 'Medium', 'High', 'Critical']; track p) {
                    <button
                      type="button"
                      (click)="ticketPriority = p"
                      class="flex-1 py-1.5 text-[10px] font-semibold rounded-md border transition-all cursor-pointer"
                      [class.bg-primary]="ticketPriority === p"
                      [class.text-primary-foreground]="ticketPriority === p"
                      [class.border-primary]="ticketPriority === p"
                      [class.border-border]="ticketPriority !== p"
                      [class.text-muted-foreground]="ticketPriority !== p"
                      [class.hover:border-primary/50]="ticketPriority !== p"
                    >
                      {{ p }}
                    </button>
                  }
                </div>
              </div>
              <button hlmBtn variant="default" class="w-full text-xs cursor-pointer gap-1.5" (click)="submitTicket()">
                <ng-icon name="lucideSend" class="size-3.5" />
                Submit Support Ticket
              </button>
            </div>
          </div>

          <!-- Developer Resources -->
          <div hlmCard class="shadow-xs overflow-hidden">
            <div class="px-4 py-3 border-b border-border/40 flex items-center gap-2">
              <ng-icon name="lucideCode" class="size-4 text-primary" />
              <h2 class="text-sm font-semibold text-foreground">Developer Resources</h2>
            </div>
            <div class="divide-y divide-border/30">
              @for (link of devLinks; track link.label) {
                <button
                  type="button"
                  (click)="openDevResource(link.label)"
                  class="w-full flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-muted/30 transition-colors text-left cursor-pointer"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="size-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <ng-icon [name]="link.icon" class="size-3.5 text-primary" />
                    </div>
                    <div>
                      <div class="text-xs font-medium text-foreground">{{ link.label }}</div>
                      <div class="text-[10px] text-muted-foreground">{{ link.description }}</div>
                    </div>
                  </div>
                  <ng-icon name="lucideExternalLink" class="size-3.5 text-muted-foreground shrink-0" />
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Article Detail Modal -->
      @if (selectedArticle()) {
        <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-card border border-border rounded-2xl max-w-2xl w-full shadow-xl max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95">
            <div class="flex items-start justify-between gap-3 p-5 border-b border-border/40 shrink-0">
              <div>
                <span hlmBadge variant="outline" class="text-[10px] mb-1">{{ selectedArticle()!.category }}</span>
                <h2 class="text-sm font-bold text-foreground">{{ selectedArticle()!.title }}</h2>
                <p class="text-[11px] text-muted-foreground mt-1">{{ selectedArticle()!.description }}</p>
              </div>
              <button hlmBtn variant="ghost" size="icon" class="cursor-pointer shrink-0" (click)="selectedArticle.set(null)">
                <ng-icon name="lucideX" class="size-4" />
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              <div class="p-4 bg-muted/30 border border-border/40 rounded-xl">
                <h3 class="font-semibold text-foreground mb-2">Overview</h3>
                <p class="text-muted-foreground leading-relaxed">{{ selectedArticle()!.description }} This guide walks you through the complete configuration workflow. Follow each step carefully to ensure a successful setup and avoid common pitfalls encountered by operators.</p>
              </div>
              <div class="p-4 bg-muted/30 border border-border/40 rounded-xl">
                <h3 class="font-semibold text-foreground mb-2">Step-by-Step Instructions</h3>
                <ol class="list-decimal list-inside space-y-1.5 text-muted-foreground">
                  <li>Navigate to the relevant settings panel in the sidebar.</li>
                  <li>Locate the configuration section at the top of the page.</li>
                  <li>Enter the required fields as described in the Prerequisites.</li>
                  <li>Click Save or Confirm to persist your changes.</li>
                  <li>Reload the page to verify the configuration has taken effect.</li>
                </ol>
              </div>
              <div class="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <div class="flex items-center gap-2 mb-2">
                  <ng-icon name="lucideAlertCircle" class="size-3.5 text-amber-600 shrink-0" />
                  <h3 class="font-semibold text-amber-600 text-xs">Important Note</h3>
                </div>
                <p class="text-amber-700 dark:text-amber-400 leading-relaxed">Changes may take up to 15 minutes to propagate across all edge nodes. Contact support if the issue persists beyond this window.</p>
              </div>
            </div>
            <div class="flex items-center justify-between gap-3 px-5 py-3 border-t border-border/40 shrink-0">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Was this article helpful?</span>
                <button type="button" (click)="markHelpful(selectedArticle()!.id, true)" class="flex items-center gap-1 text-emerald-600 hover:underline cursor-pointer">
                  <ng-icon name="lucideThumbsUp" class="size-3" /> Yes
                </button>
                <button type="button" (click)="markHelpful(selectedArticle()!.id, false)" class="flex items-center gap-1 text-rose-500 hover:underline cursor-pointer">
                  <ng-icon name="lucideThumbsDown" class="size-3" /> No
                </button>
              </div>
              <button hlmBtn variant="outline" size="sm" class="text-xs cursor-pointer" (click)="selectedArticle.set(null)">
                Close
              </button>
            </div>
          </div>
        </div>
      }

    </app-main>
  `,
})
export class HelpCenterComponent {
  private readonly ticketsApi = inject(TicketsApiService)

  readonly activeCategory = signal<string>('all')
  readonly selectedArticle = signal<HelpArticle | null>(null)
  readonly agentTyping = signal<boolean>(false)
  globalSearch = ''
  chatInput = ''
  ticketSubject = ''
  ticketCategory = ''
  ticketDescription = ''
  ticketPriority = 'Medium'

  readonly popularSearches = ['Hotel check-in', 'Channel manager', 'API authentication', 'Refund policy', 'Vehicle dispatch']

  readonly quickStats = [
    { icon: 'lucideBook', value: '240+', label: 'Knowledge Articles' },
    { icon: 'lucideCheckCircle2', value: '98.4%', label: 'Issue Resolution Rate' },
    { icon: 'lucideZap', value: '< 4 min', label: 'Avg. Response Time' },
    { icon: 'lucideStar', value: '4.9 / 5', label: 'Customer Satisfaction' },
  ]

  readonly categories = [
    { id: 'all', icon: 'lucideBook', label: 'All Topics' },
    { id: 'hotels', icon: 'lucideLifeBuoy', label: 'Hotels & PMS' },
    { id: 'vehicles', icon: 'lucideZap', label: 'Vehicles & Fleet' },
    { id: 'billing', icon: 'lucideFileText', label: 'Billing & Payments' },
    { id: 'api', icon: 'lucideCode', label: 'API & Integrations' },
    { id: 'account', icon: 'lucideMessageSquare', label: 'Account & Access' },
  ]

  readonly articles = signal<HelpArticle[]>([
    { id: 'a1', title: 'Setting Up Hotel Channel Manager with Booking.com & Expedia', category: 'Hotels & PMS', description: 'Learn how to configure iCal feed synchronization and rate parity across OTA channels.', views: 12480, helpful: 97, tags: ['channel-manager', 'OTA', 'iCal'] },
    { id: 'a2', title: 'Configuring Room Rate Plans & Dynamic Pricing Rules', category: 'Hotels & PMS', description: 'Set up Best Available Rate (BAR), corporate B2B nets, and seasonal surge pricing multipliers.', views: 8920, helpful: 95, tags: ['pricing', 'yield', 'PMS'] },
    { id: 'a3', title: 'Accepting Online Payments via Stripe & Hyperdrive Integration', category: 'Billing & Payments', description: 'Connect your Stripe account, set up escrow split-settlement, and configure payout schedules.', views: 7340, helpful: 98, tags: ['stripe', 'payments', 'escrow'] },
    { id: 'a4', title: 'Vehicle Fleet GPS Tracking & Driver App Setup', category: 'Vehicles & Fleet', description: 'Onboard drivers, assign vehicles, configure real-time tracking and dispatch notifications.', views: 6210, helpful: 94, tags: ['GPS', 'driver', 'dispatch'] },
    { id: 'a5', title: 'REST API Authentication with JWT Bearer Tokens', category: 'API & Integrations', description: 'Generate API keys, authenticate requests, and manage token expiry and refresh cycles.', views: 5890, helpful: 99, tags: ['JWT', 'auth', 'REST'] },
    { id: 'a6', title: 'Managing Multi-Workspace Organizations & Team Roles', category: 'Account & Access', description: 'Create sub-workspaces, assign granular RBAC roles, and audit team member activity logs.', views: 4320, helpful: 93, tags: ['RBAC', 'teams', 'workspace'] },
    { id: 'a7', title: 'Setting Up Cloudflare Hyperdrive for Edge Database Connections', category: 'API & Integrations', description: 'Configure Hyperdrive connection pooling to CockroachDB for sub-15ms query latency.', views: 3180, helpful: 96, tags: ['Cloudflare', 'CockroachDB', 'edge'] },
    { id: 'a8', title: 'Hotel Reservation Folio & Incidental Charge Management', category: 'Hotels & PMS', description: 'Post guest incidental charges, manage folio ledgers, and generate PDF tax invoices.', views: 2950, helpful: 92, tags: ['folio', 'invoicing', 'front-desk'] },
    { id: 'a9', title: 'How to Issue Refunds and Process Cancellations', category: 'Billing & Payments', description: 'Step-by-step guide to initiating refunds, partial credits, and handling disputed charges.', views: 2760, helpful: 95, tags: ['refund', 'cancellation', 'chargeback'] },
    { id: 'a10', title: 'Vehicle Inspection Certificate Generation & Compliance', category: 'Vehicles & Fleet', description: 'Generate 8-point inspection audit certificates, track odometer readings, and maintain compliance records.', views: 1890, helpful: 91, tags: ['inspection', 'compliance', 'PDF'] },
  ])

  readonly faqs = signal<FaqItem[]>([
    { id: 'f1', question: 'How do I connect my property to Booking.com via the Channel Manager?', answer: 'Navigate to Hotels > Properties > your property > OTA Channels tab. Enter your Booking.com hotel ID and API credentials. Click "Sync Now" to perform an initial iCal feed pull. Rate updates will propagate within 15 minutes.', category: 'hotels', isOpen: false },
    { id: 'f2', question: 'Can I assign multiple vehicles to a single driver?', answer: 'Yes. In Vehicles > Driver Dossier, use the "Assign Vehicle" button to link up to 3 vehicles per driver. The system will track which vehicle is active per shift based on GPS ping data.', category: 'vehicles', isOpen: false },
    { id: 'f3', question: 'How is escrow settlement calculated for multi-vendor bookings?', answer: 'The platform applies a 3.5% Traveller AI commission, Stripe processing fees (~2.9% + $0.30), and then distributes the net amount to each vendor based on their service contribution. All splits are shown transparently on the Checkout ledger.', category: 'billing', isOpen: false },
    { id: 'f4', question: 'What is the rate limit for API calls?', answer: 'The free tier allows 500 requests/minute. Pro tier gets 5,000 req/min. Enterprise accounts have dedicated rate limit agreements starting at 50,000 req/min. Rate limit headers are returned in all responses.', category: 'api', isOpen: false },
    { id: 'f5', question: 'How do I reset 2FA for a team member who lost their authenticator device?', answer: 'An Organization Admin can navigate to Settings > Team Members, select the user, and click "Reset MFA". The user will receive a secure OTP email to re-enroll their authenticator app within 24 hours.', category: 'account', isOpen: false },
    { id: 'f6', question: 'Does Traveller AI support corporate B2B net rates?', answer: 'Yes. In Hotel PMS > Rate Plans, create a new rate plan with type "Corporate B2B Net". Mark it as B2B Exclusive to restrict visibility to registered corporate accounts only. Set the base price multiplier (e.g. 0.85 for 15% discount).', category: 'hotels', isOpen: false },
  ])

  readonly chatMessages = signal<SupportMessage[]>([
    { id: 'm0', sender: 'agent', content: 'Welcome to Traveller AI Support! 👋 I\'m Sofia, your dedicated operations specialist. How can I assist you today?', time: '14:31' },
    { id: 'm1', sender: 'agent', content: 'I can help with hotel PMS configurations, vehicle fleet issues, billing queries, or API integrations. What brings you here?', time: '14:31' },
  ])

  readonly videoTutorials: VideoTutorial[] = [
    { id: 'v1', title: 'Hotel PMS Quickstart: Onboarding Your First Property', duration: '6:42', category: 'Hotels', thumbnail: '' },
    { id: 'v2', title: 'Configuring the 14-Day Yield Calendar Matrix', duration: '4:15', category: 'Revenue Mgmt', thumbnail: '' },
    { id: 'v3', title: 'Fleet Management: Driver Onboarding & GPS Setup', duration: '8:22', category: 'Vehicles', thumbnail: '' },
    { id: 'v4', title: 'AI Trip Basket Builder & Price Parity Matrix', duration: '5:18', category: 'Aggregator', thumbnail: '' },
  ]

  readonly devLinks = [
    { icon: 'lucideCode', label: 'REST API Reference', description: '318 endpoints with OpenAPI spec' },
    { icon: 'lucideBook', label: 'SDK Documentation', description: 'TypeScript & JavaScript SDKs' },
    { icon: 'lucideZap', label: 'Webhooks & Events Guide', description: 'Domain event payloads & retry logic' },
    { icon: 'lucideFileText', label: 'Database Schema Guide', description: '69 tables, Drizzle ORM migrations' },
  ]

  readonly filteredArticles = computed(() => {
    const cat = this.activeCategory()
    const q = this.globalSearch.toLowerCase().trim()
    const catMap: Record<string, string> = {
      hotels: 'Hotels & PMS',
      vehicles: 'Vehicles & Fleet',
      billing: 'Billing & Payments',
      api: 'API & Integrations',
      account: 'Account & Access',
    }

    return this.articles().filter((a) => {
      const matchesCat = cat === 'all' || a.category === catMap[cat]
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesQuery
    })
  })

  readonly filteredFaqs = computed(() => {
    const cat = this.activeCategory()
    const q = this.globalSearch.toLowerCase().trim()
    return this.faqs().filter((f) => {
      const matchesCat = cat === 'all' || f.category === cat
      const matchesQuery = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  })

  openArticle(article: HelpArticle): void {
    this.articles.update((list) => list.map((a) => (a.id === article.id ? { ...a, views: a.views + 1 } : a)))
    this.selectedArticle.set(article)
  }

  viewAll(): void {
    toast.info('Browsing all 240+ knowledge base articles.')
  }

  toggleFaq(id: string): void {
    this.faqs.update((list) => list.map((f) => (f.id === id ? { ...f, isOpen: !f.isOpen } : f)))
  }

  rateHelpful(id: string, helpful: boolean): void {
    toast.success(helpful ? 'Thanks for your feedback!' : 'Thanks! We\'ll improve this answer.', {
      description: helpful ? 'Your rating helps us improve our knowledge base.' : 'Our team has been notified.',
    })
  }

  markHelpful(id: string, helpful: boolean): void {
    this.rateHelpful(id, helpful)
    this.selectedArticle.set(null)
  }

  playVideo(video: VideoTutorial): void {
    toast.info(`Playing: ${video.title}`, {
      description: `Duration: ${video.duration} • Category: ${video.category}`,
    })
  }

  sendChatMessage(): void {
    if (!this.chatInput.trim()) return

    const userMsg: SupportMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: this.chatInput.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
    this.chatMessages.update((list) => [...list, userMsg])
    const userText = this.chatInput
    this.chatInput = ''
    this.agentTyping.set(true)

    setTimeout(() => {
      this.agentTyping.set(false)
      const responses: Record<string, string> = {
        hotel: 'For hotel-related queries, I recommend checking our Hotel PMS guide under Knowledge Base. You can also navigate to Hotels > Properties to manage your setup directly.',
        payment: 'Payment issues are typically resolved within 1-3 business days. Please check Billing & Payments in the sidebar. If the amount is incorrect, I can escalate to our finance team.',
        api: 'API authentication uses JWT Bearer tokens. You can generate keys under Settings > API Keys. Our rate limit is 5,000 req/min on Pro plans.',
      }

      const lowerText = userText.toLowerCase()
      let reply = 'Thanks for reaching out! Let me look into that for you. Can you share any error codes or screenshots that might help me diagnose the issue faster?'
      if (lowerText.includes('hotel')) reply = responses['hotel']
      if (lowerText.includes('payment') || lowerText.includes('billing')) reply = responses['payment']
      if (lowerText.includes('api') || lowerText.includes('key')) reply = responses['api']

      const agentMsg: SupportMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'agent',
        content: reply,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }
      this.chatMessages.update((list) => [...list, agentMsg])
    }, 1400)
  }

  async submitTicket(): Promise<void> {
    if (!this.ticketSubject.trim()) {
      toast.error('Missing Subject', { description: 'Please enter a subject for your support ticket.' })
      return
    }
    if (!this.ticketCategory) {
      toast.error('Missing Category', { description: 'Please select a support category.' })
      return
    }
    if (!this.ticketDescription.trim()) {
      toast.error('Missing Description', { description: 'Please describe your issue in detail.' })
      return
    }

    try {
      const res = await this.ticketsApi.create({
        subject: this.ticketSubject.trim(),
        category: this.ticketCategory,
        priority: (this.ticketPriority.toLowerCase() as any) || 'medium',
        customerName: 'Travel Operator',
        customerEmail: 'operator@traveller.ai',
        description: this.ticketDescription.trim(),
      })

      const ticketRef = res.ok && res.data ? res.data.ticketNumber : '#TCK-9921'
      toast.success('Support Ticket Dispatched to System', {
        description: `Ticket ${ticketRef} has been logged in Support Tickets. Support desk notified.`,
      })
      this.ticketSubject = ''
      this.ticketCategory = ''
      this.ticketDescription = ''
      this.ticketPriority = 'Medium'
    } catch {
      toast.error('Failed to submit ticket.')
    }
  }

  openDevResource(label: string): void {
    toast.info(`Opening: ${label}`, {
      description: 'Documentation portal will open in a new browser tab.',
    })
  }
}
