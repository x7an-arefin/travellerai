import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideVideo,
  lucideTv,
  lucideRadio,
  lucidePlay,
  lucidePause,
  lucideUsers,
  lucideMessageSquare,
  lucideSend,
  lucideCheck,
  lucideCopy,
  lucideSettings,
  lucideCompass,
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

export interface ChatMessage {
  id: string
  user: string
  time: string
  text: string
  role?: string
}

@Component({
  selector: 'app-broadcast',
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
      lucideVideo,
      lucideTv,
      lucideRadio,
      lucidePlay,
      lucidePause,
      lucideUsers,
      lucideMessageSquare,
      lucideSend,
      lucideCheck,
      lucideCopy,
      lucideSettings,
      lucideCompass,
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
      <!-- Title & Live Status Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">Live Destination Stream & Virtual Walkthrough</h1>
            <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-rose-500/10 text-rose-600 border border-rose-200">
              <span class="size-2 rounded-full bg-rose-500 animate-ping"></span>
              ON AIR LIVE
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Stream live travel guides, broadcast alpine virtual walking tours, and moderate traveler questions.</p>
        </div>

        <div class="flex items-center gap-2">
          <button hlmBtn variant="outline" size="sm" (click)="settingsDrawerOpen.set(true)" class="gap-1.5 cursor-pointer h-9 shadow-xs">
            <ng-icon name="lucideSettings" class="size-3.5 text-muted-foreground" />
            <span>Stream Settings</span>
          </button>
        </div>
      </div>

      <!-- Stream Health KPI Deck -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Live Travelers Watching</span>
          <div class="text-2xl font-bold text-foreground font-mono">1,842 Viewers</div>
          <p class="text-[11px] text-emerald-600 font-semibold">+310 joined during Glacier Hike</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Bitrate & Quality</span>
          <div class="text-2xl font-bold text-foreground font-mono">6,000 kbps</div>
          <p class="text-[11px] text-sky-500 font-semibold">1080p60 Full HD HDR</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Dropped Frames</span>
          <div class="text-2xl font-bold text-emerald-600 font-mono">0.00%</div>
          <p class="text-[11px] text-emerald-600 font-semibold">Starlink Alpine Satellite Uplink</p>
        </div>

        <div hlmCard class="p-4 space-y-1 hover:border-primary/40 transition-colors shadow-2xs">
          <span class="text-xs font-semibold text-muted-foreground">Session Duration</span>
          <div class="text-2xl font-bold text-foreground font-mono">01:14:28</div>
          <p class="text-[11px] text-muted-foreground">4K Recording & DVR enabled</p>
        </div>
      </div>

      <!-- Studio Stage & Live Chat Split (8 Cols vs 4 Cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Main Video Viewport (8 Cols) -->
        <div class="lg:col-span-8 space-y-4">
          <div class="h-[380px] w-full rounded-2xl bg-zinc-950 border border-border relative overflow-hidden flex flex-col justify-between p-4 shadow-xl">
            <div class="flex items-center justify-between z-10">
              <span class="rounded-md bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider">
                LIVE FROM ZERMATT
              </span>
              <span class="rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 font-mono">
                1080p 60FPS
              </span>
            </div>

            <!-- Central Video Artwork -->
            <div class="flex flex-col items-center justify-center space-y-2 text-center text-zinc-400">
              <ng-icon name="lucideTv" class="size-16 opacity-40 text-primary" />
              <p class="text-sm font-semibold text-zinc-200">Swiss Alps Live Walk: Matterhorn Glacier Trail & Gornergrat</p>
              <p class="text-xs text-zinc-500">Live Field Guide: Marco Rossi • Local Time: 15:55 CEST</p>
            </div>

            <div class="flex items-center justify-between z-10">
              <span class="text-zinc-400 text-xs font-mono">RTMP Ingest: rtmp://live.travellerai.com/live_alpine</span>
              <span class="text-emerald-400 text-xs font-bold font-mono">EXCELLENT SIGNAL</span>
            </div>
          </div>
        </div>

        <!-- Live Audience Chat Pane (4 Cols) -->
        <div hlmCard class="lg:col-span-4 p-0 overflow-hidden shadow-2xs flex flex-col h-[380px]">
          <div class="p-3 border-b border-border flex items-center justify-between bg-muted/20">
            <h3 class="font-bold text-xs text-foreground">Live Traveler Chat</h3>
            <span class="text-[10px] text-muted-foreground font-mono">{{ chatMessages().length }} messages</span>
          </div>

          <div class="p-3 flex-1 overflow-y-auto space-y-2 text-xs">
            @for (msg of chatMessages(); track msg.id) {
              <div class="space-y-0.5 p-1.5 rounded-md hover:bg-muted/40 transition-colors">
                <div class="flex items-center justify-between text-[10px]">
                  <span class="font-bold text-foreground">{{ msg.user }}</span>
                  <span class="text-muted-foreground">{{ msg.time }}</span>
                </div>
                <p class="text-muted-foreground text-[11px] leading-snug">{{ msg.text }}</p>
              </div>
            }
          </div>

          <div class="p-2.5 border-t border-border flex gap-1.5 bg-card">
            <input
              type="text"
              [(ngModel)]="chatInput"
              (keydown.enter)="sendChatMessage()"
              placeholder="Ask the tour guide a question..."
              class="h-8 flex-1 rounded-md border border-input bg-background px-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button hlmBtn size="sm" (click)="sendChatMessage()" class="h-8 px-2.5 cursor-pointer">
              <ng-icon name="lucideSend" class="size-3" />
            </button>
          </div>
        </div>
      </div>
    </app-main>

    <!-- Stream Settings Sheet -->
    <hlm-sheet [isOpen]="settingsDrawerOpen()" position="right" [size]="'sm'" (closed)="settingsDrawerOpen.set(false)">
      <div hlmSheetHeader>
        <h3 hlmSheetTitle>Broadcast Stream Settings</h3>
        <p hlmSheetDescription class="text-xs">RTMP ingestion keys and encoding configuration for field tour guides.</p>
      </div>

      <div class="space-y-4 py-4 flex-1 overflow-y-auto text-xs">
        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">RTMP Ingest Server</label>
          <input
            type="text"
            readonly
            value="rtmp://live.travellerai.com/live_alpine"
            class="h-9 w-full rounded-md border border-input bg-muted/40 font-mono text-xs px-3 outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label class="font-semibold text-foreground">Stream Key (Keep Private)</label>
          <input
            type="password"
            readonly
            value="live_sk_trv_88921a9982410fc0"
            class="h-9 w-full rounded-md border border-input bg-muted/40 font-mono text-xs px-3 outline-none"
          />
        </div>
      </div>

      <div hlmSheetFooter class="mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button hlmBtn variant="outline" (click)="settingsDrawerOpen.set(false)" class="cursor-pointer text-xs">
          Close
        </button>
      </div>
    </hlm-sheet>
  `,
})
export class BroadcastComponent {
  readonly settingsDrawerOpen = signal<boolean>(false)
  chatInput = ''

  readonly chatMessages = signal<ChatMessage[]>([
    { id: 'c-1', user: 'David Miller', time: '14:28', text: 'Can you see the Matterhorn peak from this viewpoint?' },
    { id: 'c-2', user: 'Elena Rostova', time: '14:29', text: 'Yes, clear blue skies today! The glacier hike looks breathtaking.' },
    { id: 'c-3', user: 'Marco Rossi (Guide)', time: '14:30', text: 'Temperature is 12°C, crampons recommended on the upper ridge.' },
    { id: 'c-4', user: 'Sophia Chen', time: '14:31', text: 'Just booked the 3-day Zermatt itinerary for October!' },
  ])

  sendChatMessage(): void {
    if (!this.chatInput.trim()) return

    const msg: ChatMessage = {
      id: 'c-' + (this.chatMessages().length + 1),
      user: 'Operations Host',
      time: 'Just now',
      text: this.chatInput.trim(),
    }

    this.chatMessages.update((list) => [...list, msg])
    this.chatInput = ''
    toast.success('Comment posted to live stream audience.')
  }
}
