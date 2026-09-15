export interface UserProfileSettings {
  username: string
  email: string
  fullName: string
  phone?: string
  bio: string
  url1?: string
  url2?: string
  avatarUrl?: string
}

export interface AccountSettings {
  name: string
  language: string
  dob: string
  timezone?: string
}

export interface NotificationSettings {
  commEmails: boolean
  marketingEmails: boolean
  socialEmails: boolean
  securityEmails: boolean
}

export interface DisplaySettings {
  showTasks: boolean
  showApps: boolean
  showChats: boolean
  showUsers: boolean
}
