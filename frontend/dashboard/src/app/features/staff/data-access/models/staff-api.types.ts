import { GuideProfile, StaffMember } from './staff.model'

export type NewGuideProfile = Omit<GuideProfile, 'id' | 'createdAt' | 'totalToursLed' | 'rating'>
export type UpdateGuideProfile = Partial<NewGuideProfile>

export type NewStaffMember = Omit<StaffMember, 'id' | 'createdAt' | 'invitedAt'>

export interface StaffDataResponse {
  guides: GuideProfile[]
  staff: StaffMember[]
}
