import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { GuideProfile, StaffMember } from '../models/staff.model'
import { StaffDataResponse, NewGuideProfile, UpdateGuideProfile, NewStaffMember } from '../models/staff-api.types'

@Injectable({ providedIn: 'root' })
export class StaffApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1'

  private mockGuides: GuideProfile[] = [
    {
      id: 'gde-1',
      providerId: 'prov-1',
      name: 'Marco Rossi',
      email: 'marco@swissguides.ch',
      phone: '+41 79 234 5678',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Certified UIAGM / IFMGA mountain guide with 14 years of high-alpine guiding experience across Matterhorn, Mont Blanc, and Jungfrau glaciers.',
      languages: ['German', 'English', 'Italian', 'French'],
      certifications: ['IFMGA Mountain Guide', 'Swiss Alpine Wilderness First Responder', 'Avalanche Level 3 Specialist'],
      specialties: ['Glacier Trekking', 'Via Ferrata', 'Winter Snowshoe Expeditions'],
      rating: 4.98,
      totalToursLed: 142,
      isAvailable: true,
      status: 'active',
      createdAt: '2026-06-01T10:00:00Z',
    },
    {
      id: 'gde-2',
      providerId: 'prov-1',
      name: 'Ketut Suardika',
      email: 'ketut.bali@adventures.id',
      phone: '+62 812 3456 7890',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      bio: 'Native Balinese cultural host and botanical trekker. Expert on sacred temple rituals, rice terrace irrigation systems, and waterfall exploration.',
      languages: ['English', 'Indonesian', 'Balinese', 'Japanese'],
      certifications: ['HPI Bali Certified Tour Guide', 'Eco-Tourism Naturalist', 'First Aid Responder'],
      specialties: ['Sacred Temple Ceremonies', 'Jungle Botanical Treks', 'Artisan Village Immersion'],
      rating: 4.94,
      totalToursLed: 215,
      isAvailable: true,
      status: 'active',
      createdAt: '2026-06-15T11:30:00Z',
    },
    {
      id: 'gde-3',
      providerId: 'prov-1',
      name: 'Juma Mwangi',
      email: 'juma.safari@serengeti.tz',
      phone: '+255 754 123 456',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      bio: 'Senior wildlife tracker and birding specialist with 18 years in Serengeti and Ngorongoro ecosystems. Expert in animal behavior and predator tracking.',
      languages: ['English', 'Swahili', 'German'],
      certifications: ['TANAPA Gold Level Safari Guide', 'Wilderness Advanced First Aid', 'Pro Photographic Spotter'],
      specialties: ['Big Five Tracking', 'Great Migration Crossings', 'Night Game Drives'],
      rating: 4.97,
      totalToursLed: 188,
      isAvailable: false,
      status: 'active',
      createdAt: '2026-07-01T09:00:00Z',
    },
  ]

  private mockStaff: StaffMember[] = [
    {
      id: 'stf-1',
      providerId: 'prov-1',
      name: 'Elena Rostova',
      email: 'elena@alpineadventures.com',
      role: 'manager',
      status: 'active',
      createdAt: '2026-05-10T12:00:00Z',
    },
    {
      id: 'stf-2',
      providerId: 'prov-1',
      name: 'Klaus Vogel',
      email: 'klaus.ops@alpineadventures.com',
      role: 'manager',
      status: 'active',
      createdAt: '2026-06-12T14:00:00Z',
    },
    {
      id: 'stf-3',
      providerId: 'prov-1',
      name: 'Monique Dupont',
      email: 'monique.finance@alpineadventures.com',
      role: 'finance',
      status: 'active',
      createdAt: '2026-07-15T16:00:00Z',
    },
    {
      id: 'stf-4',
      providerId: 'prov-1',
      name: 'Tobias Meyer',
      email: 'tobias.media@alpineadventures.com',
      role: 'content',
      status: 'invited',
      invitedAt: '2026-09-10T08:00:00Z',
      createdAt: '2026-09-10T08:00:00Z',
    },
  ]

  async getStaffData(): Promise<{ ok: true; data: StaffDataResponse } | { ok: false; error: string }> {
    try {
      const guides = await firstValueFrom(this.http.get<GuideProfile[]>(`${this.baseUrl}/guide-profiles`))
      const staff = await firstValueFrom(this.http.get<StaffMember[]>(`${this.baseUrl}/provider-staff`))
      return {
        ok: true,
        data: { guides, staff },
      }
    } catch {
      return {
        ok: true,
        data: {
          guides: [...this.mockGuides],
          staff: [...this.mockStaff],
        },
      }
    }
  }

  async createGuide(dto: NewGuideProfile): Promise<{ ok: true; data: GuideProfile } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<GuideProfile>(`${this.baseUrl}/guide-profiles`, dto))
      return { ok: true, data }
    } catch {
      const newGuide: GuideProfile = {
        ...dto,
        id: `gde-${Date.now()}`,
        rating: 5.0,
        totalToursLed: 0,
        createdAt: new Date().toISOString(),
      }
      this.mockGuides.unshift(newGuide)
      return { ok: true, data: newGuide }
    }
  }

  async updateGuide(id: string, dto: UpdateGuideProfile): Promise<{ ok: true; data: GuideProfile } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.patch<GuideProfile>(`${this.baseUrl}/guide-profiles/${id}`, dto))
      return { ok: true, data }
    } catch {
      const idx = this.mockGuides.findIndex(g => g.id === id)
      if (idx !== -1) {
        this.mockGuides[idx] = { ...this.mockGuides[idx], ...dto }
        return { ok: true, data: this.mockGuides[idx] }
      }
      return { ok: false, error: 'Guide not found' }
    }
  }

  async inviteStaff(dto: NewStaffMember): Promise<{ ok: true; data: StaffMember } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<StaffMember>(`${this.baseUrl}/provider-staff`, dto))
      return { ok: true, data }
    } catch {
      const newMember: StaffMember = {
        ...dto,
        id: `stf-${Date.now()}`,
        status: 'invited',
        invitedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }
      this.mockStaff.unshift(newMember)
      return { ok: true, data: newMember }
    }
  }

  async removeGuide(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/guide-profiles/${id}`))
      return { ok: true }
    } catch {
      this.mockGuides = this.mockGuides.filter(g => g.id !== id)
      return { ok: true }
    }
  }
}
