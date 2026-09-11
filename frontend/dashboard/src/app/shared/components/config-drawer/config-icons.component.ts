import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-icon-theme-system',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <path opacity="0.2" d="M0 0.03H22.88V51.17H0z" />
      <circle cx="6.7" cy="7.04" r="3.54" fill="#fff" opacity="0.8" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" />
      <path d="M18.12 6.39h-5.87c-.6 0-1.09-.45-1.09-1s.49-1 1.09-1h5.87c.6 0 1.09.45 1.09 1s-.49 1-1.09 1zM16.55 9.77h-4.24c-.55 0-1-.45-1-1s.45-1 1-1h4.24c.55 0 1 .45 1 1s-.45 1-1 1z" fill="#fff" stroke="none" opacity="0.75" />
      <path d="M18.32 17.37H4.59c-.69 0-1.25-.47-1.25-1.05s.56-1.05 1.25-1.05h13.73c.69 0 1.25.47 1.25 1.05s-.56 1.05-1.25 1.05z" fill="#fff" stroke="none" opacity="0.72" />
      <path d="M15.34 21.26h-11c-.55 0-1-.41-1-.91s.45-.91 1-.91h11c.55 0 1 .41 1 .91s-.45.91-1 .91z" fill="#fff" stroke="none" opacity="0.55" />
      <path d="M16.46 25.57H4.43c-.6 0-1.09-.44-1.09-.98s.49-.98 1.09-.98h12.03c.6 0 1.09.44 1.09.98s-.49.98-1.09.98z" fill="#fff" stroke="none" opacity="0.67" />
      <rect x="33.36" y="19.73" width="2.75" height="3.42" rx="0.33" opacity="0.31" stroke="none" />
      <rect x="29.64" y="16.57" width="2.75" height="6.58" rx="0.33" opacity="0.4" stroke="none" />
      <rect x="37.16" y="14.44" width="2.75" height="8.7" rx="0.33" opacity="0.26" stroke="none" />
      <rect x="41.19" y="10.75" width="2.75" height="12.4" rx="0.33" opacity="0.37" stroke="none" />
      <circle cx="62.74" cy="16.32" r="8" opacity="0.25" />
      <path d="M62.74 16.32l4.1-6.87c1.19.71 2.18 1.72 2.86 2.92s1.04 2.57 1.04 3.95h-8z" opacity="0.45" />
      <rect x="29.64" y="27.75" width="41.62" height="18.62" rx="1.69" opacity="0.3" stroke="none" />
    </svg>
  `,
})
export class IconThemeSystemComponent {}

@Component({
  selector: 'app-icon-theme-light',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px]">
      <g fill="#d9d9d9">
        <rect x="0.53" y="0.5" width="78.83" height="50.14" rx="3.5" />
      </g>
      <path d="M22.88 0h52.97c2.21 0 4 1.79 4 4v43.14c0 2.21-1.79 4-4 4H22.88V0z" fill="#ecedef" />
      <circle cx="6.7" cy="7.04" r="3.54" fill="#fff" />
      <path d="M18.12 6.39h-5.87c-.6 0-1.09-.45-1.09-1s.49-1 1.09-1h5.87c.6 0 1.09.45 1.09 1s-.49 1-1.09 1z" fill="#fff" />
      <path d="M18.32 17.37H4.59c-.69 0-1.25-.47-1.25-1.05s.56-1.05 1.25-1.05h13.73c.69 0 1.25.47 1.25 1.05s-.56 1.05-1.25 1.05z" fill="#fff" />
      <path d="M15.34 21.26h-11c-.55 0-1-.41-1-.91s.45-.91 1-.91h11c.55 0 1 .41 1 .91s-.45.91-1 .91z" fill="#fff" />
      <g fill="#c0c4c4">
        <rect x="33.36" y="19.73" width="2.75" height="3.42" rx="0.33" opacity="0.32" />
        <rect x="29.64" y="16.57" width="2.75" height="6.58" rx="0.33" opacity="0.44" />
        <rect x="37.16" y="14.44" width="2.75" height="8.7" rx="0.33" opacity="0.53" />
        <rect x="41.19" y="10.75" width="2.75" height="12.4" rx="0.33" opacity="0.53" />
      </g>
      <circle cx="62.74" cy="16.32" r="8" fill="#fff" />
      <rect x="29.64" y="27.75" width="41.62" height="18.62" rx="1.69" fill="#fff" />
    </svg>
  `,
})
export class IconThemeLightComponent {}

@Component({
  selector: 'app-icon-theme-dark',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px]">
      <g fill="#1d2b3f">
        <rect x="0.53" y="0.5" width="78.83" height="50.14" rx="3.5" />
      </g>
      <path d="M22.88 0h52.97c2.21 0 4 1.79 4 4v43.14c0 2.21-1.79 4-4 4H22.88V0z" fill="#0d1628" />
      <circle cx="6.7" cy="7.04" r="3.54" fill="#426187" />
      <path d="M18.12 6.39h-5.87c-.6 0-1.09-.45-1.09-1s.49-1 1.09-1h5.87c.6 0 1.09.45 1.09 1s-.49 1-1.09 1z" fill="#426187" />
      <path d="M18.32 17.37H4.59c-.69 0-1.25-.47-1.25-1.05s.56-1.05 1.25-1.05h13.73c.69 0 1.25.47 1.25 1.05s-.56 1.05-1.25 1.05z" fill="#426187" />
      <g fill="#2a62bc">
        <rect x="33.36" y="19.73" width="2.75" height="3.42" rx="0.33" opacity="0.32" />
        <rect x="29.64" y="16.57" width="2.75" height="6.58" rx="0.33" opacity="0.44" />
        <rect x="37.16" y="14.44" width="2.75" height="8.7" rx="0.33" opacity="0.53" />
        <rect x="41.19" y="10.75" width="2.75" height="12.4" rx="0.33" opacity="0.53" />
      </g>
      <circle cx="62.74" cy="16.32" r="8" fill="#2f5491" opacity="0.5" />
      <rect x="29.64" y="27.75" width="41.62" height="18.62" rx="1.69" fill="#17273f" />
    </svg>
  `,
})
export class IconThemeDarkComponent {}

@Component({
  selector: 'app-icon-sidebar-inset',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <rect x="23.39" y="5.57" width="50.22" height="40" rx="2" opacity="0.2" />
      <path fill="none" opacity="0.72" stroke-width="2px" d="M5.08 17.05L17.31 17.05" />
      <path fill="none" opacity="0.48" stroke-width="2px" d="M5.08 24.25L15.6 24.25" />
      <path fill="none" opacity="0.55" stroke-width="2px" d="M5.08 20.54L14.46 20.54" />
      <circle cx="7.04" cy="9.57" r="2.54" opacity="0.8" />
      <path fill="none" opacity="0.8" stroke-width="2px" d="M11.59 8.3L17.31 8.3" />
    </svg>
  `,
})
export class IconSidebarInsetComponent {}

@Component({
  selector: 'app-icon-sidebar-floating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <rect x="5.89" y="5.15" width="19.74" height="40" rx="2" opacity="0.8" />
      <rect x="29.94" y="19.28" width="43.11" height="25.87" rx="2" opacity="0.3" />
      <rect x="29.94" y="13.42" width="26.03" height="2.73" rx="0.64" opacity="0.44" />
    </svg>
  `,
})
export class IconSidebarFloatingComponent {}

@Component({
  selector: 'app-icon-sidebar-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <path d="M23.42.51h51.99c2.21 0 4 1.79 4 4v42.18c0 2.21-1.79 4-4 4H23.42V.55z" opacity="0.2" />
      <path fill="none" opacity="0.72" stroke-width="2px" d="M5.56 14.88L17.78 14.88" />
      <path fill="none" opacity="0.48" stroke-width="2px" d="M5.56 22.09L16.08 22.09" />
      <circle cx="7.51" cy="7.4" r="2.54" opacity="0.8" />
    </svg>
  `,
})
export class IconSidebarSidebarComponent {}

@Component({
  selector: 'app-icon-layout-default',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <rect x="5.84" y="5.02" width="19.14" height="40" rx="2" opacity="0.8" />
      <rect x="29.63" y="24.22" width="21.8" height="19.95" rx="2.11" opacity="0.4" />
      <path d="M75.1 6.68v1.45c0 .63-.49 1.14-1.09 1.14H30.72c-.6 0-1.09-.51-1.09-1.14V6.68c0-.62.49-1.14 1.09-1.14h43.29c.6 0 1.09.52 1.09 1.14z" opacity="0.9" />
    </svg>
  `,
})
export class IconLayoutDefaultComponent {}

@Component({
  selector: 'app-icon-layout-compact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <rect x="5.84" y="5.2" width="4" height="40" rx="2" opacity="0.8" />
      <rect x="14.93" y="5.89" width="59.16" height="2.73" rx="0.64" opacity="0.9" />
      <rect x="14.93" y="24.22" width="32.68" height="19.95" rx="2.11" opacity="0.4" />
    </svg>
  `,
})
export class IconLayoutCompactComponent {}

@Component({
  selector: 'app-icon-layout-full',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <rect x="5.84" y="5.89" width="68.26" height="2.73" rx="0.64" opacity="0.9" />
      <rect x="5.84" y="24.22" width="37.71" height="19.95" rx="2.11" opacity="0.4" />
    </svg>
  `,
})
export class IconLayoutFullComponent {}

@Component({
  selector: 'app-icon-dir',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.86 51.14" [class.scale-x-[-1]]="direction === 'rtl'" class="w-full h-auto overflow-hidden rounded-[6px] fill-current stroke-current">
      <path d="M23.42.51h51.92c2.21 0 4 1.79 4 4v42.18c0 2.21-1.79 4-4 4H23.42V.55z" opacity="0.15" />
      <path fill="none" opacity="0.72" stroke-width="2px" d="M5.56 14.88L17.78 14.88" />
      <circle cx="7.51" cy="7.4" r="2.54" opacity="0.8" />
      <rect x="28.76" y="17.01" width="44.25" height="13.48" rx="0.64" opacity="0.3" />
    </svg>
  `,
})
export class IconDirComponent {
  @Input() direction: 'ltr' | 'rtl' = 'ltr'
}

export const ConfigIconsImports = [
  IconThemeSystemComponent,
  IconThemeLightComponent,
  IconThemeDarkComponent,
  IconSidebarInsetComponent,
  IconSidebarFloatingComponent,
  IconSidebarSidebarComponent,
  IconLayoutDefaultComponent,
  IconLayoutCompactComponent,
  IconLayoutFullComponent,
  IconDirComponent,
] as const
