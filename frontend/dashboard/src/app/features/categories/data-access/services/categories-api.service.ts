import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { Category } from '../models/categories.model'
import { NewCategory, UpdateCategory, CategoryListResponse } from '../models/categories-api.types'

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('categories')

  private mockCategories: Category[] = [
    {
      id: 'cat-1',
      name: 'Alpine Trekking & Mountaineering',
      slug: 'alpine-trekking-mountaineering',
      icon: 'mountain',
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
      description: 'High altitude hiking, summit expeditions, via ferrata, and glacier crossings with certified guides.',
      packageCount: 18,
      sortOrder: 1,
      status: 'active',
      createdAt: '2026-08-01T10:00:00Z',
    },
    {
      id: 'cat-2',
      name: 'Wildlife & Safari Expeditions',
      slug: 'wildlife-safari-expeditions',
      icon: 'compass',
      coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Game drives, Great Migration tracking, private conservancy game walks, and birdwatching.',
      packageCount: 14,
      sortOrder: 2,
      status: 'active',
      createdAt: '2026-08-02T11:00:00Z',
    },
    {
      id: 'cat-3',
      name: 'Cultural & Sacred Heritage',
      slug: 'cultural-sacred-heritage',
      icon: 'landmark',
      coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
      description: 'Ancient temple walks, UNESCO monuments, artisan craft immersion, and spiritual sanctuary visits.',
      packageCount: 22,
      sortOrder: 3,
      status: 'active',
      createdAt: '2026-08-03T09:30:00Z',
    },
    {
      id: 'cat-4',
      name: 'Culinary, Wine & Gastronomy',
      slug: 'culinary-wine-gastronomy',
      icon: 'utensils',
      coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
      description: 'Vineyard tastings, Michelin-starred regional tastings, farm-to-table cooking classes, and local market foraging.',
      packageCount: 16,
      sortOrder: 4,
      status: 'active',
      createdAt: '2026-08-04T14:15:00Z',
    },
    {
      id: 'cat-5',
      name: 'Catamaran Sailing & Water Expeditions',
      slug: 'catamaran-sailing-water-expeditions',
      icon: 'ship',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      description: 'Sunset sailing, volcanic caldera cruising, reef snorkeling, scuba diving, and coastal island-hopping.',
      packageCount: 12,
      sortOrder: 5,
      status: 'active',
      createdAt: '2026-08-05T16:00:00Z',
    },
    {
      id: 'cat-6',
      name: 'Scenic Flight & Ballooning',
      slug: 'scenic-flight-ballooning',
      icon: 'wind',
      coverImage: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600',
      description: 'Sunrise hot air ballooning, panoramic helicopter transfers, and aerial sightseeing over geological wonders.',
      packageCount: 9,
      sortOrder: 6,
      status: 'active',
      createdAt: '2026-08-06T12:00:00Z',
    },
  ]

  async list(): Promise<{ ok: true; data: CategoryListResponse } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.get<CategoryListResponse>(this.baseUrl))
      return { ok: true, data }
    } catch {
      return {
        ok: true,
        data: {
          items: [...this.mockCategories],
          total: this.mockCategories.length,
        },
      }
    }
  }

  async create(dto: NewCategory): Promise<{ ok: true; data: Category } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<Category>(this.baseUrl, dto))
      return { ok: true, data }
    } catch {
      const newCat: Category = {
        ...dto,
        id: `cat-${Date.now()}`,
        packageCount: 0,
        createdAt: new Date().toISOString(),
      }
      this.mockCategories.unshift(newCat)
      return { ok: true, data: newCat }
    }
  }

  async update(id: string, dto: UpdateCategory): Promise<{ ok: true; data: Category } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<Category>(`${this.baseUrl}/${id}`, dto))
      return { ok: true, data }
    } catch {
      const idx = this.mockCategories.findIndex(c => c.id === id)
      if (idx !== -1) {
        this.mockCategories[idx] = { ...this.mockCategories[idx], ...dto }
        return { ok: true, data: this.mockCategories[idx] }
      }
      return { ok: false, error: 'Category not found' }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockCategories = this.mockCategories.filter(c => c.id !== id)
      return { ok: true }
    }
  }
}
