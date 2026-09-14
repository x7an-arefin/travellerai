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

const DEFAULT_MOCK_USER: AuthUser = {
  name: 'satnaing',
  email: 'satnaingdev@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  role: ['Admin', 'Manager'],
}

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
    const user: AuthUser = {
      name: email.split('@')[0] || 'Admin User',
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
      role: ['Admin'],
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

  hasAccess(permissions?: string[], roles?: string[]): boolean {
    const user = this._user()
    if (!user) return false
    const userRoles = (user.role ?? []).map((r) => r.toLowerCase())
    if (userRoles.includes('admin') || userRoles.includes('superadmin')) return true
    const userPerms = user.permissions ?? []
    if (userPerms.includes('all')) return true

    const roleMatched = roles && roles.length > 0 ? roles.some((r) => userRoles.includes(r.toLowerCase())) : false
    const permMatched = permissions && permissions.length > 0 ? permissions.some((p) => userPerms.includes(p)) : false

    if (roles && roles.length > 0 && permissions && permissions.length > 0) {
      return roleMatched || permMatched
    }

    if (roles && roles.length > 0) {
      return roleMatched
    }

    if (permissions && permissions.length > 0) {
      return permMatched
    }

    return true
  }

  hasAnyPermission(permissions: string[]): boolean {
    return this.hasAccess(permissions)
  }

  getDefaultRouteForRole(): string {
    const user = this._user()
    if (!user || !user.role || !user.role.length) return '/'
    const roles = user.role.map((r) => r.toLowerCase())
    if (roles.includes('superadmin') || roles.includes('admin')) return '/'
    if (roles.includes('providerowner') || roles.includes('provider') || roles.includes('agency_owner')) return '/'
    if (roles.includes('guide')) return '/departures'
    if (roles.includes('financeadmin') || roles.includes('finance')) return '/wallets'
    if (roles.includes('traveler')) return '/bookings'
    return '/'
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
