import { Injectable, inject } from '@angular/core'
import { StaffStore } from './store/staff.store'
import { NewGuideProfile, NewStaffMember } from './models/staff-api.types'

@Injectable({ providedIn: 'root' })
export class StaffFacade {
  private readonly store = inject(StaffStore)

  readonly guides = this.store.filteredGuides
  readonly allGuides = this.store.guides
  readonly staff = this.store.filteredStaff
  readonly allStaff = this.store.staff
  readonly activeTab = this.store.activeTab
  readonly isLoading = this.store.isLoading
  readonly isDrawerOpen = this.store.isDrawerOpen
  readonly drawerMode = this.store.drawerMode
  readonly searchQuery = this.store.searchQuery

  loadStaffData(): void {
    this.store.loadStaffData()
  }

  setActiveTab(tab: 'guides' | 'staff'): void {
    this.store.setActiveTab(tab)
  }

  setSearchQuery(q: string): void {
    this.store.setSearchQuery(q)
  }

  openAddGuideDrawer(): void {
    this.store.openAddGuideDrawer()
  }

  openInviteStaffDrawer(): void {
    this.store.openInviteStaffDrawer()
  }

  closeDrawer(): void {
    this.store.closeDrawer()
  }

  createGuide(dto: NewGuideProfile): Promise<boolean> {
    return this.store.createGuide(dto)
  }

  inviteStaff(dto: NewStaffMember): Promise<boolean> {
    return this.store.inviteStaff(dto)
  }

  removeGuide(id: string): Promise<boolean> {
    return this.store.removeGuide(id)
  }
}
