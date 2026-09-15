import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { MarketplaceUser, CreateUserDto, UpdateUserDto } from '../models/users.model'
import { ListUsersApiResponse, UserApiResponse } from '../models/users-api.types'
import { mockUsers } from '../../data/users'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('users')

  // In-memory fallback seeded from mockUsers
  private fallbackUsers: MarketplaceUser[] = (mockUsers as any[]).map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username,
    email: u.email,
    phoneNumber: u.phoneNumber,
    phone: u.phoneNumber,
    status: u.status,
    role: u.role,
    avatar: u.avatar,
    avatarUrl: u.avatar,
    createdAt: new Date().toISOString(),
  }))

  async list(cursor?: string, limit = 50, role?: string, status?: string): Promise<UserApiResponse<ListUsersApiResponse>> {
    try {
      let params = new HttpParams().set('limit', limit)
      if (cursor) params = params.set('cursor', cursor)
      if (role && role !== 'all') params = params.set('role', role)
      if (status && status !== 'all') params = params.set('status', status)

      const res = await firstValueFrom(this.http.get<any>(this.baseUrl, { params }))
      const items: MarketplaceUser[] = Array.isArray(res) ? res : res.items || res.data || this.fallbackUsers
      return { ok: true, data: { items, total: items.length, nextCursor: res.nextCursor, hasMore: res.hasMore } }
    } catch {
      let filtered = [...this.fallbackUsers]
      if (status && status !== 'all') {
        filtered = filtered.filter((u) => u.status === status)
      }
      if (role && role !== 'all') {
        filtered = filtered.filter((u) => u.role === role)
      }
      return { ok: true, data: { items: filtered, total: filtered.length } }
    }
  }

  async getById(id: string): Promise<UserApiResponse<MarketplaceUser>> {
    try {
      const data = await firstValueFrom(this.http.get<MarketplaceUser>(`${this.baseUrl}/${id}`))
      return { ok: true, data }
    } catch {
      const found = this.fallbackUsers.find((u) => u.id === id)
      if (found) return { ok: true, data: found }
      return { ok: false, error: 'User not found' }
    }
  }

  async create(dto: CreateUserDto): Promise<UserApiResponse<MarketplaceUser>> {
    try {
      const payload = {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone || dto.phoneNumber,
        role: dto.role,
        status: dto.status || 'active',
        avatarUrl: dto.avatar,
      }
      const data = await firstValueFrom(this.http.post<MarketplaceUser>(this.baseUrl, payload))
      return { ok: true, data }
    } catch {
      const newUser: MarketplaceUser = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        firstName: dto.firstName,
        lastName: dto.lastName,
        username: dto.username || `${dto.firstName.toLowerCase()}.${dto.lastName.toLowerCase()}`,
        email: dto.email,
        phone: dto.phone || dto.phoneNumber,
        phoneNumber: dto.phoneNumber || dto.phone,
        status: dto.status || 'active',
        role: dto.role,
        avatar: dto.avatar,
        createdAt: new Date().toISOString(),
      }
      this.fallbackUsers.unshift(newUser)
      return { ok: true, data: newUser }
    }
  }

  async update(id: string, dto: Partial<CreateUserDto>): Promise<UserApiResponse<MarketplaceUser>> {
    try {
      const payload = {
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.email && { email: dto.email }),
        ...((dto.phone || dto.phoneNumber) && { phone: dto.phone || dto.phoneNumber }),
        ...(dto.role && { role: dto.role }),
        ...(dto.status && { status: dto.status }),
        ...(dto.avatar && { avatarUrl: dto.avatar }),
      }
      const data = await firstValueFrom(this.http.patch<MarketplaceUser>(`${this.baseUrl}/${id}`, payload))
      return { ok: true, data }
    } catch {
      const idx = this.fallbackUsers.findIndex((u) => u.id === id)
      if (idx !== -1) {
        this.fallbackUsers[idx] = { ...this.fallbackUsers[idx], ...dto }
        return { ok: true, data: this.fallbackUsers[idx] }
      }
      return { ok: false, error: 'User not found' }
    }
  }

  async delete(id: string): Promise<UserApiResponse<boolean>> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true, data: true }
    } catch {
      this.fallbackUsers = this.fallbackUsers.filter((u) => u.id !== id)
      return { ok: true, data: true }
    }
  }
}
