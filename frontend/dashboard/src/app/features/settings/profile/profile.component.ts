import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HlmButtonImports } from '../../../ui/button/hlm-button.directive'
import { HlmInputImports } from '../../../ui/input/hlm-input.directive'
import { HlmTextareaImports } from '../../../ui/textarea/hlm-textarea.directive'
import { HlmSeparatorImports } from '../../../ui/separator/hlm-separator.directive'
import { AuthService } from '../../../core/services/auth.service'
import { SettingsApiService } from '../data-access/services/settings-api.service'
import { toast } from 'ngx-sonner'

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmTextareaImports,
    ...HlmSeparatorImports,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Profile</h3>
        <p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>

      <div hlmSeparator></div>

      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Username</label>
          <input hlmInput formControlName="username" />
          <p class="text-xs text-muted-foreground">This is your public display name. It can be your real name or a pseudonym.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Email</label>
          <input hlmInput type="email" formControlName="email" />
          <p class="text-xs text-muted-foreground">You can manage verified email addresses in your email settings.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Bio</label>
          <textarea hlmTextarea formControlName="bio" rows="4"></textarea>
          <p class="text-xs text-muted-foreground">You can &#64;mention other users and organizations to link to them.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">URLs</label>
          <input hlmInput formControlName="url1" placeholder="https://traveller.ai" />
          <input hlmInput formControlName="url2" placeholder="https://github.com/travellerai" />
          <p class="text-xs text-muted-foreground">Add links to your website, blog, or social media profiles.</p>
        </div>

        <button hlmBtn type="submit" [disabled]="profileForm.invalid" class="cursor-pointer">
          Update profile
        </button>
      </form>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly settingsApi = inject(SettingsApiService)
  readonly authService = inject(AuthService)

  readonly profileForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
    url1: [''],
    url2: [''],
  })

  ngOnInit(): void {
    const profile = this.settingsApi.getProfile()
    this.profileForm.patchValue({
      username: profile.username,
      email: profile.email,
      bio: profile.bio,
      url1: profile.url1 || '',
      url2: profile.url2 || '',
    })
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) return
    await this.settingsApi.updateProfile(this.profileForm.value)
    toast.success('Profile updated successfully!')
  }
}

