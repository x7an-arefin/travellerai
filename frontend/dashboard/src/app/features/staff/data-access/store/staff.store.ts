import { Injectable, signal, computed, inject } from '@angular/core'
import { GuideProfile, StaffMember } from '../models/staff.model'
import { NewGuideProfile, UpdateGuideProfile, NewStaffMember } from '../models/staff-api.types'
import { StaffApiService } from '../services/staff-api.service'

export type DrawerMode = 'add-guide' | 'invite-staff' | null

@Injectable({ providedIn: 'root' })
export class StaffStore {
  private readonly api = inject(StaffApiService)

  readonly guides = signal<GuideProfile[]>([])
  readonly staff = signal<StaffMember[]>([])
  readonly selectedId = signal<string | null>(null)
  readonly drawerMode = signal<DrawerMode>(null)
  readonly deleteConfirmId = signal<string | null>(null)
  readonly isLoading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  readonly activeTab = signal<'guides' | 'staff'>('guides')
  readonly searchQuery = signal<string>('')

  readonly hasError = computed(() => this.error() !== null)
  readonly errorMessage = computed(() => this.error())
  readonly isDrawerOpen = computed(() => this.drawerMode() !== null)

  readonly filteredGuides = computed(() => {
    const q = this.searchQuery().toLowerCase().trim()
    const all = this.guides()
    if (!q) return all
    return all.filter(g => g.name.toLowerCase().includes(q) || g.languages.some(l => l.toLowerCase().includes(q)))
  })

  readonly filteredStaff = computed(() => {
    const q = this.searchQuery().toLowerCase().trim()
    const all = this.staff()
    if (!q) return all
    return all.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.role.toLowerCase().includes(q))
  })

  openAddGuideDrawer(): void {
    this.selectedId.set(null)
    this.drawerMode.set('add-guide')
  }

  openInviteStaffDrawer(): void {
    this.selectedId.set(null)
    this.drawerMode.set('invite-staff')
  }

  closeDrawer(): void {
    this.drawerMode.set(null)
    this.selectedId.set(null)
  }

  setActiveTab(tab: 'guides' | 'staff'): void {
    this.activeTab.set(tab)
  }

  setSearchQuery(q: string): void {
    this.searchQuery.set(q)
  }

  async loadStaffData(): Promise<void> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.getStaffData()
    this.isLoading.set(false)
    if (res.ok) {
      this.guides.set(res.data.guides)
      this.staff.set(res.data.staff)
    } else {
      this.error.set(res.error)
    }
  }

  async createGuide(dto: NewGuideProfile): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.createGuide(dto)
    this.isLoading.set(false)
    if (res.ok) {
      this.guides.update(prev => [res.data, ...prev])
      this.closeDrawer()
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }

  async inviteStaff(dto: NewStaffMember): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.inviteStaff(dto)
    this.isLoading.set(false)
    if (res.ok) {
      this.staff.update(prev => [res.data, ...prev])
      this.closeDrawer()
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }

  async removeGuide(id: string): Promise<boolean> {
    this.isLoading.set(true)
    this.error.set(null)
    const res = await this.api.removeGuide(id)
    this.isLoading.set(false)
    if (res.ok) {
      this.guides.update(prev => prev.filter(g => g.id !== id))
      return true
    } else {
      this.error.set(res.error)
      return false
    }
  }
}
