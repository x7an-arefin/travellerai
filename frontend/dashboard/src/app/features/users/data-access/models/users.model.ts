export type MarketplaceUserRole =
  | 'super_admin'
  | 'admin'
  | 'finance_admin'
  | 'content_admin'
  | 'support_agent'
  | 'provider_owner'
  | 'provider_manager'
  | 'guide'
  | 'traveler'
  | 'affiliate'
  // Legacy UI aliases
  | 'superadmin'
  | 'manager'
  | 'cashier'

export type MarketplaceUserStatus =
  | 'active'
  | 'suspended'
  | 'banned'
  | 'pending_verification'
  // Legacy UI aliases
  | 'inactive'
  | 'invited'

export interface MarketplaceUser {
  id: string
  firstName: string
  lastName: string
  username?: string
  email: string
  phoneNumber?: string
  phone?: string
  role: MarketplaceUserRole
  status: MarketplaceUserStatus
  avatar?: string
  avatarUrl?: string
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  lastLoginAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  username?: string
  phone?: string
  phoneNumber?: string
  role: MarketplaceUserRole
  status?: MarketplaceUserStatus
  avatar?: string
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string
}
