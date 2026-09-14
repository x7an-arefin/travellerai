import { Injectable, computed, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { getCookie, removeCookie, setCookie } from '../utils/cookies'
import authConfig from '../auth/auth-config.json'

export interface AuthUser {
  id?: string
  accountNo?: string
  name: string
  email: string
  avatar: string
  role: string[]
  permissions?: string[]
  exp?: number
}

type AuthConfig = {
  mode?: 'mock' | 'api-contract'
  baseUrl?: string
  loginEndpoint: string
  signupEndpoint: string
  sessionEndpoint: string
  refreshEndpoint: string
  logoutEndpoint: string
  credentials?: 'include' | 'omit'
}

type AuthResponse = {
  user?: {
    id?: string
    name: string
    email: string
    image?: string
    avatar?: string
    role?: string | string[]
    permissions?: string[] | string
  }
  session?: { token?: string; accessToken?: string; expiresAt?: string }
  token?: string
  accessToken?: string
}

const config = authConfig as AuthConfig
const ACCESS_TOKEN_KEY = 'admin_access_token'
const USER_KEY = 'admin_auth_user'

export const MOCK_USERS: Record<string, AuthUser> = {
  'arefin@traveller.ai': {
    id: 'usr-admin-1',
    name: 'Sultanul Arefin',
    email: 'arefin@traveller.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: ['SuperAdmin', 'Admin'],
    permissions: ['all'],
  },
  'elena@alpineadventures.com': {
    id: 'usr-provider-1',
    name: 'Elena Rostova',
    email: 'elena@alpineadventures.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    role: ['ProviderOwner', 'Provider'],
    permissions: ['packages.manage', 'departures.manage', 'bookings.view', 'withdrawals.request'],
  },
  'marco@swissguides.ch': {
    id: 'usr-guide-1',
    name: 'Marco Rossi',
    email: 'marco@swissguides.ch',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    role: ['Guide', 'Staff'],
    permissions: ['departures.view', 'bookings.checkin'],
  },
  'finance@traveller.ai': {
    id: 'usr-finance-1',
    name: 'Sarah Jenkins',
    email: 'finance@traveller.ai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    role: ['FinanceAdmin'],
    permissions: ['wallets.manage', 'withdrawals.approve', 'ledger.view'],
  },
  'emma.richardson@gmail.com': {
    id: 'usr-traveler-1',
    name: 'Emma Richardson',
    email: 'emma.richardson@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    role: ['Traveler'],
    permissions: ['bookings.create', 'reviews.write'],
  },
}

const DEFAULT_MOCK_USER: AuthUser = MOCK_USERS['arefin@traveller.ai']

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly router = inject(Router)
  private readonly http = inject(HttpClient)
  private readonly apiMode = config.mode === 'api-contract' || Boolean((globalThis as Record<string, unknown>)['__FAST_ADMIN_API_MODE__'])

  private readonly _user = signal<AuthUser | null>(this.getInitialUser())
  readonly user = this._user.asReadonly()

  private readonly _accessToken = signal<string>(this.getInitialToken())
  readonly accessToken = this._accessToken.asReadonly()

  readonly isAuthenticated = computed(() => !!this._accessToken() || !!this._user())
  private sessionPromise: Promise<boolean> | null = null

  async ensureSession(): Promise<boolean> {
    if (!this.apiMode) return this.isAuthenticated()
    if (!this.sessionPromise) this.sessionPromise = this.restoreSession().finally(() => { this.sessionPromise = null })
    return this.sessionPromise
  }

  async restoreSession(): Promise<boolean> {
    if (!this.apiMode) return this.isAuthenticated()
    try {
      const response = await firstValueFrom(this.http.get<AuthResponse>(this.url(config.sessionEndpoint), { withCredentials: true }))
      this.apply(response)
      return Boolean(response.user || response.session || response.token || response.accessToken)
    } catch {
      this.clear()
      return false
    }
  }

  async signInAsync(email: string, password?: string): Promise<boolean> {
    if (!this.apiMode) return this.signIn(email, password)
    try {
      const response = await firstValueFrom(this.http.post<AuthResponse>(this.url(config.loginEndpoint), { email, password }, { withCredentials: true }))
      this.apply(response)
      return Boolean(response.user || response.session || response.token || response.accessToken)
    } catch {
      this.clear()
      return false
    }
  }

  signIn(email: string, password?: string): boolean {
    if (this.apiMode) {
      void this.signInAsync(email, password)
      return true
    }
    const matchedUser = MOCK_USERS[email.toLowerCase().trim()]
    const user: AuthUser = matchedUser ?? {
      name: email.split('@')[0] || 'User',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: ['Admin'],
    }
    this.setSession(user, 'mock_jwt_token_' + Date.now())
    return true
  }

  async signUpAsync(name: string, email: string, password?: string): Promise<boolean> {
    if (!this.apiMode) return this.signUp(name, email, password)
    try {
      const response = await firstValueFrom(this.http.post<AuthResponse>(this.url(config.signupEndpoint), { name, email, password }, { withCredentials: true }))
      this.apply(response)
      return Boolean(response.user || response.session || response.token || response.accessToken)
    } catch {
      return false
    }
  }

  signUp(name: string, email: string, _password?: string): boolean {
    if (this.apiMode) {
      void this.signUpAsync(name, email, _password)
      return true
    }
    const user: AuthUser = {
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: ['Traveler'],
    }
    this.setSession(user, 'mock_jwt_token_' + Date.now())
    return true
  }

  async refresh(): Promise<boolean> {
    if (!this.apiMode) return this.isAuthenticated()
    try {
      const response = await firstValueFrom(this.http.get<AuthResponse>(this.url(config.refreshEndpoint), { withCredentials: true }))
      this.apply(response)
      return Boolean(response.user || response.session || response.token || response.accessToken)
    } catch {
      this.clear()
      return false
    }
  }

  async signOut(): Promise<void> {
    try {
      if (this.apiMode) await firstValueFrom(this.http.post(this.url(config.logoutEndpoint), {}, { withCredentials: true }))
    } finally {
      this.clear()
      await this.router.navigate(['/sign-in'])
    }
  }

  verifyOtp(_code: string): boolean {
    return this.isAuthenticated() || this.signIn('satnaingdev@gmail.com')
  }

  hasRole(role: string | string[]): boolean {
    const required = Array.isArray(role) ? role : [role]
    const roles = (this._user()?.role ?? []).map((value) => value.toLowerCase())
    return required.some((value) => roles.includes(value.toLowerCase())) || roles.includes('admin') || roles.includes('superadmin')
  }

  hasPermission(permission: string): boolean {
    return this.hasRole(['admin', 'superadmin']) || (this._user()?.permissions ?? []).includes(permission)
  }

  hasAnyPermission(permissions: string[]): boolean {
    return permissions.length === 0 || this.hasRole(['admin', 'superadmin']) || permissions.some((permission) => this.hasPermission(permission))
  }

  private apply(response: AuthResponse): void {
    if (response.user) {
      const role = Array.isArray(response.user.role) ? response.user.role : response.user.role ? [response.user.role] : []
      const permissions = Array.isArray(response.user.permissions)
        ? response.user.permissions
        : typeof response.user.permissions === 'string'
          ? response.user.permissions.split(',').map((value) => value.trim()).filter(Boolean)
          : []
      this._user.set({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        avatar: response.user.avatar ?? response.user.image ?? '',
        role,
        permissions,
      })
    }
    const token = response.accessToken ?? response.token ?? response.session?.accessToken ?? response.session?.token
    if (token) this._accessToken.set(token)
  }

  private setSession(user: AuthUser, token: string): void {
    this._user.set(user)
    this._accessToken.set(token)
    if (isPlatformBrowser(this.platformId)) {
      setCookie(ACCESS_TOKEN_KEY, token, 7)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }
  }

  private clear(): void {
    this._user.set(null)
    this._accessToken.set('')
    if (isPlatformBrowser(this.platformId)) {
      removeCookie(ACCESS_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }

  private url(endpoint: string): string {
    const base = config.baseUrl ?? ''
    if (!base) return endpoint
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base
    const trimmedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    return `${trimmedBase}/${trimmedEndpoint}`
  }

  private getInitialUser(): AuthUser | null {
    if (this.apiMode) return null
    if (!isPlatformBrowser(this.platformId)) return DEFAULT_MOCK_USER
    const saved = localStorage.getItem(USER_KEY)
    if (saved) {
      try { return JSON.parse(saved) as AuthUser } catch { return DEFAULT_MOCK_USER }
    }
    return DEFAULT_MOCK_USER
  }

  private getInitialToken(): string {
    if (this.apiMode && isPlatformBrowser(this.platformId)) return getCookie(ACCESS_TOKEN_KEY) || ''
    if (!isPlatformBrowser(this.platformId)) return this.apiMode ? '' : 'mock_token'
    return getCookie(ACCESS_TOKEN_KEY) || 'mock_token'
  }
}
