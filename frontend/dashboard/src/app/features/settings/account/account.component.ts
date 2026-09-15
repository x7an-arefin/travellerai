import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { HlmSelectImports, SelectOption } from '../../../ui/select/hlm-select.components'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { SettingsApiService } from '../data-access/services/settings-api.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmSelectImports,
    ...HlmSeparatorImports,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Account</h3>
        <p class="text-sm text-muted-foreground">Update your account settings. Set your preferred language and timezone.</p>
      </div>

      <div hlmSeparator></div>

      <form [formGroup]="accountForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Full Name</label>
          <input hlmInput formControlName="name" />
          <p class="text-xs text-muted-foreground">Your name will appear on invoices and public certificates.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Language</label>
          <div class="w-full sm:w-60">
            <hlm-custom-select
              [options]="languageOptions"
              formControlName="language"
              placeholder="Select language"
            />
          </div>
          <p class="text-xs text-muted-foreground">This is the language that will be used in dashboard emails.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Date of Birth</label>
          <input hlmInput type="date" formControlName="dob" />
          <p class="text-xs text-muted-foreground">Your date of birth is used to calculate your age.</p>
        </div>

        <button hlmBtn type="submit" [disabled]="accountForm.invalid" class="cursor-pointer">
          Update account
        </button>
      </form>
    </div>
  `,
})
export class AccountComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly settingsApi = inject(SettingsApiService)

  readonly languageOptions: SelectOption[] = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Japanese', value: 'ja' },
  ]

  readonly accountForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    language: ['en', [Validators.required]],
    dob: ['1996-05-18'],
  })

  ngOnInit(): void {
    const account = this.settingsApi.getAccount()
    this.accountForm.patchValue({
      name: account.name,
      language: account.language,
      dob: account.dob,
    })
  }

  async onSubmit(): Promise<void> {
    if (this.accountForm.invalid) return
    await this.settingsApi.updateAccount(this.accountForm.value)
    toast.success('Account settings updated!')
  }
}

