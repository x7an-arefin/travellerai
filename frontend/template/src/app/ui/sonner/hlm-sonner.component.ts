import { Component } from '@angular/core'
import { NgxSonnerToaster } from 'ngx-sonner'

@Component({
  selector: 'hlm-toaster',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      class="toaster group"
      [position]="'bottom-right'"
      [richColors]="true"
      [closeButton]="true"
    />
  `,
})
export class HlmToasterComponent {}

export const HlmToasterImports = [HlmToasterComponent]
