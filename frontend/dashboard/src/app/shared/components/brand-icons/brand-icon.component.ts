import { Component, Input, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { cn } from '../../../core/utils/cn'

@Component({
  selector: 'app-brand-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (name.toLowerCase()) {
      @case ('telegram') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
        </svg>
      }
      @case ('notion') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4v16h16V4H4z" />
          <path d="M7 8l5 8V8" />
          <path d="M12 8l5 8V8" />
        </svg>
      }
      @case ('figma') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" />
          <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
        </svg>
      }
      @case ('trello') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M7 7h3v8h-3z" />
          <path d="M14 7h3v4h-3z" />
        </svg>
      }
      @case ('slack') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 0 1 2 -2a2 2 0 0 1 0 4h-6" />
          <path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 0 1 -2 2a2 2 0 0 1 -4 0v-6" />
          <path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 0 1 -2 2a2 2 0 0 1 0 -4h6" />
          <path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 0 1 2 -2a2 2 0 0 1 4 0v6" />
        </svg>
      }
      @case ('zoom') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
          <path d="M16 11l4 -2.5v7l-4 -2.5" />
        </svg>
      }
      @case ('stripe') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11.453 8.056c0 -.623 .518 -.979 1.442 -.979c1.69 0 3.41 .343 4.605 .923l.5 -4c-.948 -.449 -2.82 -1 -5.5 -1c-1.895 0 -3.373 .087 -4.5 1c-1.172 .956 -2 2.33 -2 4c0 3.03 1.958 4.906 5 6c1.961 .69 3 .743 3 1.5c0 .735 -.851 1.5 -2 1.5c-1.423 0 -3.963 -.609 -5.5 -1.5l-.5 4c1.321 .734 3.474 1.5 6 1.5c2 0 3.957 -.468 5.084 -1.36c1.263 -.979 1.916 -2.268 1.916 -4.14c0 -3.096 -1.915 -4.547 -5 -5.637c-1.646 -.605 -2.544 -1.07 -2.544 -1.807z" />
        </svg>
      }
      @case ('gmail') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 12h3c.667 0 1.25 .333 1.5 1s.167 1.333 -.333 2l-6.167 6a2 2 0 0 1 -2 0l-6.167 -6c-.5 -.667 -.583 -1.333 -.333 -2s.833 -1 1.5 -1h3v-7c0 -.667 .333 -1.25 1 -1.5s1.333 -.167 2 .333l4 3.5c.667 .5 1 1.083 1 1.667v7z" />
        </svg>
      }
      @case ('medium') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 9h1l3 3l3 -3h1v6h-2v-3l-2 2l-2 -2v3h-2z" />
        </svg>
      }
      @case ('skype') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a9 9 0 0 1 8.6 6.3a4.5 4.5 0 0 1 1.1 6.2a9 9 0 0 1 -8.6 6.3a4.5 4.5 0 0 1 -1.1 -6.2a9 9 0 0 1 0 -12.6" />
          <path d="M9.5 10c0 -1.1 .9 -2 2.5 -2s2.5 .9 2.5 2c0 2 -4 1.5 -4 3.5c0 1.1 .9 2 2.5 2s2.5 -.9 2.5 -2" />
        </svg>
      }
      @case ('docker') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12.54c-1.804 -.345 -2.701 -1.08 -3.523 -2.54c-1.636 -.327 -2.454 -.818 -3.477 -1.54v2.54h-10v5.54c0 .828 .672 1.5 1.5 1.5h11c.828 0 1.5 -.672 1.5 -1.5c0 -1.002 .498 -2.004 1.5 -2.5c.668 -.334 1.334 -.334 1.5 -1.5z" />
          <path d="M5 9h3v3h-3z" />
          <path d="M9 9h3v3h-3z" />
          <path d="M9 5h3v3h-3z" />
        </svg>
      }
      @case ('github') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
      }
      @case ('gitlab') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7z" />
        </svg>
      }
      @case ('discord') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18.5 5.5c-1.5 -.5 -3 -.8 -4.5 -.9l-.2 .4c1.8 .5 3 1.5 3 1.5c-1.8 -1 -3.8 -1.5 -5.8 -1.5s-4 .5 -5.8 1.5c0 0 1.2 -1 3 -1.5l-.2 -.4c-1.5 .1 -3 .4 -4.5 .9c-2.5 3.8 -3.2 7.5 -2.9 11.2c1.7 1.3 3.3 2.1 4.9 2.6l.7 -1c-1 -.3 -1.9 -.8 -2.7 -1.4c.2 .2 .5 .3 .7 .5c1.7 1 3.5 1.5 5.3 1.5s3.6 -.5 5.3 -1.5c.2 -.2 .5 -.3 .7 -.5c-.8 .6 -1.7 1.1 -2.7 1.4l.7 1c1.6 -.5 3.2 -1.3 4.9 -2.6c.4 -4.3 -.7 -8 -2.9 -11.2z" />
          <circle cx="8.5" cy="12.5" r="1.5" />
          <circle cx="15.5" cy="12.5" r="1.5" />
        </svg>
      }
      @case ('whatsapp') {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
      }
      @default {
        <svg [class]="_computedClass()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9" />
        </svg>
      }
    }
  `,
})
export class BrandIconComponent {
  @Input({ required: true }) name!: string
  @Input() class: string = ''

  protected readonly _computedClass = computed(() => {
    return cn('size-6 shrink-0', this.class)
  })
}
