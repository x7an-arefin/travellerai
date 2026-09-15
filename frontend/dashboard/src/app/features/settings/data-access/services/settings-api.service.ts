import { Injectable, inject, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { AuthService } from '../../../../core/services/auth.service'
import { UsersApiService } from '../../../users/data-access/services/users-api.service'
import {
  UserProfileSettings,
  AccountSettings,
  NotificationSettings,
  DisplaySettings,
} from '../models/settings.model'

@Injectable({
  providedIn: 'root',
})
export class SettingsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly authService = inject(AuthService)
  private readonly usersApi = inject(UsersApiService)

  private readonly PROFILE_KEY = 'traveller_settings_profile'
  private readonly ACCOUNT_KEY = 'traveller_settings_account'
  private readonly NOTIFS_KEY = 'traveller_settings_notifications'
  private readonly DISPLAY_KEY = 'traveller_settings_display'

  // Default Fallbacks
  private readonly defaultProfile: UserProfileSettings = {
    username: 'arefin',
    email: 'arefin@traveller.ai',
    fullName: 'Sultanul Arefin',
    phone: '+880 1711 999888',
    bio: 'Platform Lead & Operations Architect at TravellerAI.',
    url1: 'https://traveller.ai',
    url2: 'https://github.com/travellerai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  }

  private readonly defaultAccount: AccountSettings = {
    name: 'Sultanul Arefin',
    language: 'en',
    dob: '1996-05-18',
    timezone: 'UTC+6 (Asia/Dhaka)',
  }

  private readonly defaultNotifications: NotificationSettings = {
    commEmails: true,
    marketingEmails: false,
    socialEmails: true,
    securityEmails: true,
  }

  private readonly defaultDisplay: DisplaySettings = {
    showTasks: true,
    showApps: true,
    showChats: true,
    showUsers: true,
  }

  // Profile
  getProfile(): UserProfileSettings {
    try {
      const stored = localStorage.getItem(this.PROFILE_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      // Fallback
    }

    const currentAuthUser = this.authService.user()
    if (currentAuthUser) {
      return {
        ...this.defaultProfile,
        email: currentAuthUser.email || this.defaultProfile.email,
        fullName: currentAuthUser.name || this.defaultProfile.fullName,
        username: currentAuthUser.name?.toLowerCase().replace(/\s+/g, '_') || this.defaultProfile.username,
        avatarUrl: currentAuthUser.avatar || this.defaultProfile.avatarUrl,
      }
    }

    return this.defaultProfile
  }

  async updateProfile(dto: Partial<UserProfileSettings>): Promise<{ ok: true; data: UserProfileSettings }> {
    const current = this.getProfile()
    const updated: UserProfileSettings = { ...current, ...dto }

    try {
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(updated))
    } catch {
      // Storage unavailable
    }

    // Attempt to persist to UserModule if ID is known
    const authUser = this.authService.user()
    if (authUser?.id) {
      try {
        await this.usersApi.update(authUser.id, {
          email: updated.email,
          phone: updated.phone,
        })
      } catch {
        // Continue offline
      }
    }

    return { ok: true, data: updated }
  }

  // Account
  getAccount(): AccountSettings {
    try {
      const stored = localStorage.getItem(this.ACCOUNT_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      // Fallback
    }
    return this.defaultAccount
  }

  async updateAccount(dto: Partial<AccountSettings>): Promise<{ ok: true; data: AccountSettings }> {
    const current = this.getAccount()
    const updated: AccountSettings = { ...current, ...dto }

    try {
      localStorage.setItem(this.ACCOUNT_KEY, JSON.stringify(updated))
    } catch {
      // Storage unavailable
    }

    return { ok: true, data: updated }
  }

  // Notifications
  getNotifications(): NotificationSettings {
    try {
      const stored = localStorage.getItem(this.NOTIFS_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      // Fallback
    }
    return this.defaultNotifications
  }

  async updateNotifications(dto: NotificationSettings): Promise<{ ok: true; data: NotificationSettings }> {
    try {
      localStorage.setItem(this.NOTIFS_KEY, JSON.stringify(dto))
    } catch {
      // Storage unavailable
    }
    return { ok: true, data: dto }
  }

  // Display
  getDisplay(): DisplaySettings {
    try {
      const stored = localStorage.getItem(this.DISPLAY_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      // Fallback
    }
    return this.defaultDisplay
  }

  async updateDisplay(dto: DisplaySettings): Promise<{ ok: true; data: DisplaySettings }> {
    try {
      localStorage.setItem(this.DISPLAY_KEY, JSON.stringify(dto))
    } catch {
      // Storage unavailable
    }
    return { ok: true, data: dto }
  }
}
