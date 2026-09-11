import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  lucideBot,
  lucideUser,
  lucideSend,
  lucideSliders,
  lucideCopy,
  lucideCheck,
  lucideSparkles,
  lucideRefreshCw,
  lucideCode,
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
import { HlmTextareaImports } from '../../ui/textarea/hlm-textarea.directive'
import { HlmSelectImports } from '../../ui/select/hlm-select.components'
import { toast } from 'ngx-sonner'

export interface PlaygroundMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  codeSnippet?: string
  tokens?: number
}

@Component({
  selector: 'app-ai-playground',
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
    ...HlmTextareaImports,
    ...HlmSelectImports,
  ],
  providers: [
    provideIcons({
      lucideBot,
      lucideUser,
      lucideSend,
      lucideSliders,
      lucideCopy,
      lucideCheck,
      lucideSparkles,
      lucideRefreshCw,
      lucideCode,
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

    <!-- Main Content Area -->
    <app-main [fixed]="true" class="space-y-4 h-[calc(100svh-4.5rem)] flex flex-col overflow-hidden">
      <!-- Title & Token Counter -->
      <div class="flex items-center justify-between shrink-0">
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight">AI Model Playground</h1>
            <span hlmBadge variant="default" class="text-[10px] gap-1 font-bold">
              <ng-icon name="lucideSparkles" class="size-3" />
              Interactive
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Experiment with LLM system prompts, hyperparameters, and code generation.</p>
        </div>

        <span hlmBadge variant="secondary" class="font-mono text-xs hidden sm:inline-flex">
          524 tokens used
        </span>
      </div>

      <!-- 2-Pane Playground Layout -->
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
        <!-- Left 3 Columns: Chat Stream -->
        <div hlmCard class="lg:col-span-3 p-0 flex flex-col justify-between overflow-hidden shadow-sm">
          <!-- Messages Scroll Area -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            @for (msg of messages(); track $index) {
              <div
                class="flex items-start gap-3 text-xs sm:text-sm"
                [class.justify-end]="msg.role === 'user'"
              >
                @if (msg.role === 'assistant') {
                  <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                    <ng-icon name="lucideBot" class="size-4.5" />
                  </div>
                }

                <div
                  class="max-w-[85%] rounded-2xl p-4 space-y-3 leading-relaxed shadow-2xs"
                  [class.bg-primary]="msg.role === 'user'"
                  [class.text-primary-foreground]="msg.role === 'user'"
                  [class.rounded-br-xs]="msg.role === 'user'"
                  [class.bg-muted/40]="msg.role === 'assistant'"
                  [class.border]="msg.role === 'assistant'"
                  [class.border-border]="msg.role === 'assistant'"
                  [class.rounded-bl-xs]="msg.role === 'assistant'"
                >
                  <p class="whitespace-pre-line">{{ msg.content }}</p>

                  <!-- Code Snippet Box -->
                  @if (msg.codeSnippet) {
                    <div class="rounded-xl border border-border bg-slate-950 text-slate-100 p-3 font-mono text-xs space-y-2 overflow-x-auto shadow-md">
                      <div class="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
                        <span>TypeScript (Angular 21)</span>
                        <button (click)="copySnippet(msg.codeSnippet)" class="hover:text-white cursor-pointer flex items-center gap-1">
                          <ng-icon name="lucideCopy" class="size-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <pre class="leading-relaxed">{{ msg.codeSnippet }}</pre>
                    </div>
                  }
                </div>
              </div>
            }

            @if (isGenerating()) {
              <div class="flex items-center gap-2 text-xs text-muted-foreground p-2">
                <ng-icon name="lucideSparkles" class="size-4 animate-spin text-primary" />
                <span>AI model is generating response...</span>
              </div>
            }
          </div>

          <!-- Prompt Composer Footer -->
          <div class="p-3 border-t border-border bg-background flex items-center gap-2">
            <textarea
              hlmTextarea
              [(ngModel)]="userPrompt"
              (keydown.enter)="sendPrompt()"
              rows="1"
              placeholder="Ask anything or request component code..."
              class="flex-1 text-xs sm:text-sm resize-none"
            ></textarea>
            <button
              hlmBtn
              size="icon"
              (click)="sendPrompt()"
              [disabled]="!userPrompt.trim() || isGenerating()"
              class="size-9 cursor-pointer shrink-0 shadow-xs"
            >
              <ng-icon name="lucideSend" class="size-4" />
            </button>
          </div>
        </div>

        <!-- Right 1 Column: Hyperparameters Sidebar -->
        <div hlmCard class="p-4 space-y-4 overflow-y-auto text-xs no-scrollbar shadow-sm">
          <div class="flex items-center justify-between pb-2 border-b border-border">
            <h3 class="font-bold text-foreground">Model Parameters</h3>
            <button (click)="resetParams()" class="text-muted-foreground hover:text-foreground cursor-pointer" title="Reset defaults">
              <ng-icon name="lucideRefreshCw" class="size-3.5" />
            </button>
          </div>

          <!-- Model Dropdown -->
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">Model</label>
            <hlm-custom-select
              [options]="modelOptions"
              [(ngModel)]="selectedModel"
              placeholder="Select model"
            />
          </div>

          <!-- System Prompt Textarea -->
          <div class="space-y-1.5">
            <label class="font-semibold text-foreground">System Prompt</label>
            <textarea
              hlmTextarea
              [(ngModel)]="systemPrompt"
              rows="3"
              class="w-full text-[11px]"
            ></textarea>
          </div>

          <!-- Temperature Slider -->
          <div class="space-y-1.5">
            <div class="flex justify-between">
              <label class="font-semibold text-foreground">Temperature</label>
              <span class="font-mono text-muted-foreground">{{ temperature }}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              [(ngModel)]="temperature"
              class="w-full accent-primary cursor-pointer"
            />
          </div>

          <!-- Max Tokens Slider -->
          <div class="space-y-1.5">
            <div class="flex justify-between">
              <label class="font-semibold text-foreground">Max Tokens</label>
              <span class="font-mono text-muted-foreground">{{ maxTokens }}</span>
            </div>
            <input
              type="range"
              min="256"
              max="4096"
              step="256"
              [(ngModel)]="maxTokens"
              class="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>
      </div>
    </app-main>
  `,
})
export class AiPlaygroundComponent {
  selectedModel: any = 'gpt-4o'
  systemPrompt = 'You are a staff frontend architect specializing in Angular 21, Spartan UI, and Tailwind CSS v4.'
  temperature = 0.7
  maxTokens = 2048
  userPrompt = ''
  readonly isGenerating = signal<boolean>(false)

  readonly modelOptions = [
    { label: 'OpenAI GPT-4o (Omni)', value: 'gpt-4o' },
    { label: 'Claude 3.5 Sonnet', value: 'claude-3-5' },
    { label: 'Meta Llama 3 (70B)', value: 'llama-3' },
  ]

  readonly messages = signal<PlaygroundMessage[]>([
    {
      role: 'user',
      content: 'Can you show me how to create a signal-based theme switcher in Angular 21?',
    },
    {
      role: 'assistant',
      content: 'Here is a clean implementation of a signal-driven ThemeService with local persistence and DOM attribute reflection:',
      codeSnippet: `@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<'light' | 'dark'>('light');
  readonly theme = this._theme.asReadonly();

  toggleTheme(): void {
    const next = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }
}`,
    },
  ])

  sendPrompt(): void {
    if (!this.userPrompt.trim()) return

    const userText = this.userPrompt
    this.messages.update((list) => [...list, { role: 'user', content: userText }])
    this.userPrompt = ''
    this.isGenerating.set(true)

    setTimeout(() => {
      this.isGenerating.set(false)
      this.messages.update((list) => [
        ...list,
        {
          role: 'assistant',
          content: `Here is the response generated using ${this.selectedModel} at temperature ${this.temperature}:`,
          codeSnippet: `export const featureConfig = {\n  model: '${this.selectedModel}',\n  temperature: ${this.temperature},\n  active: true\n};`,
        },
      ])
    }, 1200)
  }

  copySnippet(code: string): void {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code)
    }
    toast.success('Code snippet copied to clipboard!')
  }

  resetParams(): void {
    this.temperature = 0.7
    this.maxTokens = 2048
    toast.info('Model parameters reset to defaults.')
  }
}
