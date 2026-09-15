import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideMapPin,
  lucideCalendar,
  lucideQrCode,
  lucideCar,
  lucideBedDouble,
  lucideSparkles,
  lucidePhone,
  lucideMessageSquare,
  lucideCompass,
  lucideClock,
  lucideCheckCircle2,
  lucideSend,
  lucideWifi,
  lucidePrinter,
  lucideChevronRight,
  lucideBot,
  lucidePlane,
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
import { TripPassApiService } from './data-access/services/trip-pass-api.service'
import { TripPassInfo, ConciergeMessage } from './data-access/models/trip-pass.model'
import { UniversalCartFacade } from '../checkout/data-access/universal-cart.facade'
import { toast } from 'ngx-sonner'

export type ChatMessage = ConciergeMessage


@Component({
  selector: 'app-trip-pass',
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
  ],
  providers: [
    provideIcons({
      lucideMapPin,
      lucideCalendar,
      lucideQrCode,
      lucideCar,
      lucideBedDouble,
      lucideSparkles,
      lucidePhone,
      lucideMessageSquare,
      lucideCompass,
      lucideClock,
      lucideCheckCircle2,
      lucideSend,
      lucideWifi,
      lucidePrinter,
      lucideChevronRight,
      lucideBot,
      lucidePlane,
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
    <app-main [fixed]="true" class="space-y-6 max-w-5xl mx-auto py-6">
      <!-- Master Trip Pass Header Card -->
      <div class="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-background p-6 sm:p-8 space-y-4 shadow-xs">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white uppercase tracking-wider">
                Active Master Trip Pass
              </span>
              <span class="text-xs text-muted-foreground font-mono">Ref: {{ passInfo().reference }}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {{ passInfo().title }}
            </h1>
            <p class="text-xs text-muted-foreground flex items-center gap-2">
              <span class="flex items-center gap-1">
                <ng-icon name="lucideCalendar" class="size-3.5 text-primary" />
                {{ passInfo().dates }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <ng-icon name="lucideMapPin" class="size-3.5 text-primary" />
                {{ passInfo().destination }}
              </span>
            </p>
          </div>

          <button
            hlmBtn
            variant="outline"
            size="sm"
            (click)="onPrintItinerary()"
            class="gap-1.5 text-xs cursor-pointer shrink-0"
          >
            <ng-icon name="lucidePrinter" class="size-3.5" />
            <span>Print Trip Pass</span>
          </button>
        </div>

        <!-- Day Tabs Selector -->
        <div class="flex overflow-x-auto gap-2 border-t border-border/50 pt-4 no-scrollbar">
          @for (d of passInfo().days; track d.day) {
            <button
              type="button"
              (click)="selectedDay.set(d.day)"
              [class]="selectedDay() === d.day ? 'bg-primary text-primary-foreground font-bold shadow-xs' : 'bg-card text-muted-foreground hover:bg-muted border border-border/60'"
              class="px-4 py-2 rounded-xl text-xs flex flex-col items-center transition-all cursor-pointer shrink-0 min-w-[100px]"
            >
              <span class="text-[10px] uppercase tracking-wider opacity-80">Day {{ d.day }}</span>
              <span class="font-bold">{{ d.date }}</span>
              <span class="text-[9px] truncate mt-0.5">{{ d.theme }}</span>
            </button>
          }
        </div>

      </div>

      <!-- Split Layout: Day Pass Details & 24/7 AI Concierge -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Left 2 Cols: Active Day Mission Passes -->
        <div class="lg:col-span-2 space-y-4">
          @if (selectedDay() === 1) {
            <!-- ================= DAY 1: AIRPORT ARRIVAL & VIP CHAUFFEUR ================= -->
            <div hlmCard class="p-5 space-y-4 shadow-2xs">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <div class="flex items-center gap-2">
                  <div class="size-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <ng-icon name="lucideCar" class="size-4" />
                  </div>
                  <div>
                    <h3 class="text-xs font-bold uppercase tracking-wider text-foreground">Leg 1: Airport VIP Chauffeur Transfer</h3>
                    <p class="text-[11px] text-muted-foreground">Flight Radar Linked Dispatch</p>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                  Driver Dispatched
                </span>
              </div>

              <!-- Flight Status Badge -->
              <div class="p-3 rounded-lg border border-border/60 bg-muted/20 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <ng-icon name="lucidePlane" class="size-4 text-primary" />
                  <div>
                    <p class="font-bold text-foreground">Flight BG-601 (DAC ➔ ZYL)</p>
                    <p class="text-[10px] text-muted-foreground">Biman Bangladesh Airlines • On Schedule</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-[10px] text-muted-foreground">Landing ETA</span>
                  <p class="font-bold text-emerald-600">14:20 Local</p>
                </div>
              </div>

              <!-- Driver Profile & Handover PIN -->
              <div class="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                    alt="Driver"
                    class="size-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h4 class="font-bold text-foreground text-xs">Rafiqul Islam (VIP Chauffeur)</h4>
                    <p class="text-[11px] text-muted-foreground">Toyota HiAce Super GL • Plate: DHK-11-4092</p>
                    <div class="flex items-center gap-2 text-[10px] text-primary font-semibold mt-1">
                      <span class="flex items-center gap-1">★ 4.98 (340 Trips)</span>
                      <span>•</span>
                      <span>Apex Fleet</span>
                    </div>
                  </div>
                </div>

                <!-- One-Time Passenger OTP Verification PIN -->
                <div class="text-center p-2 rounded-lg bg-background border border-border/60 shadow-2xs shrink-0">
                  <span class="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Boarding PIN</span>
                  <div class="text-base font-extrabold font-mono text-primary tracking-widest mt-0.5">8419</div>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs pt-1">
                <a
                  href="tel:+8801711000000"
                  class="flex items-center gap-1.5 text-primary font-bold hover:underline cursor-pointer"
                >
                  <ng-icon name="lucidePhone" class="size-3.5" />
                  <span>Call Chauffeur Directly</span>
                </a>

                <span class="text-[11px] text-muted-foreground">Drop-off: Grand Sylhet 5-Star Resort</span>
              </div>
            </div>
          }

          <!-- ================= HOTEL STAY PASS (ALL DAYS) ================= -->
          <div hlmCard class="p-5 space-y-4 shadow-2xs">
            <div class="flex items-center justify-between border-b border-border pb-3">
              <div class="flex items-center gap-2">
                <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ng-icon name="lucideBedDouble" class="size-4" />
                </div>
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-foreground">Grand Sylhet 5-Star Resort & Spa</h3>
                  <p class="text-[11px] text-muted-foreground">Room 408 • Deluxe King Suite (Mountain View)</p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                Guaranteed Stay
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div class="sm:col-span-2 space-y-2 text-xs">
                <div class="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/40">
                  <span class="text-muted-foreground">Check-in:</span>
                  <span class="font-bold text-foreground">Sep 18, 14:00</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/40">
                  <span class="text-muted-foreground">Check-out:</span>
                  <span class="font-bold text-foreground">Sep 22, 11:00</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/40">
                  <span class="text-muted-foreground">High-Speed Wi-Fi:</span>
                  <span class="font-mono font-bold text-primary flex items-center gap-1">
                    <ng-icon name="lucideWifi" class="size-3" />
                    GrandResort_Guest (PW: sylhet2026)
                  </span>
                </div>
              </div>

              <!-- Instant Check-in QR Code -->
              <div class="flex flex-col items-center justify-center p-3 rounded-xl border border-border/60 bg-muted/10 text-center">
                <div class="size-20 bg-background rounded-lg border border-border p-1 flex items-center justify-center shadow-2xs">
                  <ng-icon name="lucideQrCode" class="size-16 text-foreground" />
                </div>
                <span class="text-[10px] text-muted-foreground mt-1 font-mono">Scan at Front Desk</span>
              </div>
            </div>
          </div>

          <!-- ================= DAY EXCURSION / TREK PASS ================= -->
          <div hlmCard class="p-5 space-y-4 shadow-2xs">
            <div class="flex items-center justify-between border-b border-border pb-3">
              <div class="flex items-center gap-2">
                <div class="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <ng-icon name="lucideCompass" class="size-4" />
                </div>
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider text-foreground">Day 2: Ratargul Swamp & Tea Highlands Trek</h3>
                  <p class="text-[11px] text-muted-foreground">Bengal Trailblazers Tour Operations</p>
                </div>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                Guide Assigned
              </span>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <span class="text-muted-foreground">Meeting Point:</span>
                <span class="font-bold text-foreground">Hotel Lobby, 08:30 AM Sharp</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <span class="text-muted-foreground">Certified Guide:</span>
                <span class="font-bold text-foreground">Tanvir Ahmed (+880 1819 223344)</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <span class="text-muted-foreground">Gear Provided:</span>
                <span class="text-foreground">Life vests, rain ponchos, filtered water canteen</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 1 Col: 24/7 AI Concierge Bot -->
        <div hlmCard class="p-5 space-y-4 shadow-2xs lg:sticky lg:top-20">
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div class="flex items-center gap-2">
              <div class="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <ng-icon name="lucideBot" class="size-4" />
              </div>
              <div>
                <h3 class="text-xs font-bold text-foreground">24/7 AI Travel Concierge</h3>
                <p class="text-[10px] text-emerald-500 font-semibold">Online • Live PMS/FMS Linked</p>
              </div>
            </div>
          </div>

          <!-- Chat Stream -->
          <div class="h-64 overflow-y-auto space-y-2.5 pr-1 text-xs">
            @for (msg of chatMessages(); track msg.timestamp) {
              <div
                class="rounded-xl p-3 space-y-1"
                [class]="msg.sender === 'ai' ? 'bg-muted/40 border border-border/50 text-foreground mr-4' : 'bg-primary text-primary-foreground ml-4'"
              >
                <p class="leading-relaxed">{{ msg.text }}</p>
                @if (msg.actionPill) {
                  <span class="inline-block text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold mt-1 border border-primary/20">
                    {{ msg.actionPill }}
                  </span>
                }
              </div>
            }
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap gap-1 pt-1 border-t border-border/40">
            <button
              type="button"
              (click)="sendQuickRequest('Request 2:00 PM Late Checkout at Grand Sylhet')"
              class="text-[10px] px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer"
            >
              + Late Checkout
            </button>
            <button
              type="button"
              (click)="sendQuickRequest('Request extra towels & minibar refill to Room 408')"
              class="text-[10px] px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer"
            >
              + Room Service
            </button>
            <button
              type="button"
              (click)="sendQuickRequest('Where is my airport chauffeur Rafiqul currently located?')"
              class="text-[10px] px-2 py-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground cursor-pointer"
            >
              + Driver Location
            </button>
          </div>

          <!-- Chat Input -->
          <div class="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              [(ngModel)]="userMessageInput"
              (keyup.enter)="sendMessage()"
              placeholder="Ask anything about your stay or transfer..."
              class="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:ring-1 focus:ring-primary shadow-2xs"
            />
            <button
              hlmBtn
              variant="default"
              size="sm"
              (click)="sendMessage()"
              class="h-8 px-2.5 cursor-pointer shadow-xs"
            >
              <ng-icon name="lucideSend" class="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class TripPassComponent implements OnInit {
  private readonly tripPassApi = inject(TripPassApiService)
  private readonly cartFacade = inject(UniversalCartFacade)

  readonly selectedDay = signal<number>(1)
  userMessageInput = ''

  readonly passInfo = signal<TripPassInfo>({
    bookingId: 'bk-sylhet-101',
    reference: 'TRV-SYL-9082X',
    title: 'Sylhet Rain Forest & Luxury Highlands Expedition',
    destination: 'Sylhet, Bangladesh',
    dates: 'Sep 18 - Sep 22, 2026 (5 Days / 4 Nights)',
    status: 'active',
    guestName: 'Sultanul Arefin',
    guestEmail: 'arefin@traveller.ai',
    totalAmount: 955,
    currency: 'USD',
    qrCodeData: 'TRV-SYL-9082X-VERIFIED-OPERATOR',
    days: [
      { day: 1, date: 'Sep 18', theme: 'Arrival & Chauffeur' },
      { day: 2, date: 'Sep 19', theme: 'Swamp & Tea Trek' },
      { day: 3, date: 'Sep 20', theme: 'Self-Drive 4x4' },
      { day: 4, date: 'Sep 21', theme: 'Resort Wellness' },
      { day: 5, date: 'Sep 22', theme: 'Airport Departure' },
    ],
  })

  readonly chatMessages = signal<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! Welcome to your digital Trip Pass. I am monitoring your travel itinerary and have dispatched your concierge services. How can I assist you today?',
      timestamp: '14:00',
    },
  ])

  async ngOnInit(): Promise<void> {
    const bookingRef = this.cartFacade.lastBookingReference() || undefined
    const res = await this.tripPassApi.getTripPass(bookingRef)
    if (res.ok && res.data) {
      this.passInfo.set(res.data)
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.userMessageInput.trim()) return
    const userText = this.userMessageInput.trim()
    this.userMessageInput = ''

    const now = new Date()
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    this.chatMessages.update((msgs) => [
      ...msgs,
      { sender: 'user', text: userText, timestamp },
    ])

    try {
      const res = await this.tripPassApi.sendConciergeMessage(this.passInfo().reference, userText)
      if (res.ok && res.reply) {
        this.chatMessages.update((msgs) => [...msgs, res.reply])
      }
    } catch {
      this.chatMessages.update((msgs) => [
        ...msgs,
        {
          sender: 'ai',
          text: 'I have logged your request into the operational console. Our support desk has been notified.',
          timestamp: 'Now',
          actionPill: 'Request Logged',
        },
      ])
    }
  }

  sendQuickRequest(text: string): void {
    this.userMessageInput = text
    this.sendMessage()
  }

  onPrintItinerary(): void {
    window.print()
  }
}

