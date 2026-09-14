export interface GuideProfile {
  id: string
  providerId: string
  name: string
  email?: string
  phone?: string
  photoUrl?: string
  bio?: string
  languages: string[]
  certifications: string[]
  specialties: string[]
  rating: number
  totalToursLed?: number
  isAvailable: boolean
  status: 'active' | 'inactive' | 'suspended'
  createdAt?: string
}

export interface StaffMember {
  id: string
  providerId: string
  name: string
  email: string
  role: 'manager' | 'finance' | 'content' | 'guide' | 'custom'
  status: 'active' | 'invited' | 'inactive'
  invitedAt?: string
  createdAt?: string
}
