export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string | null
  parentName?: string
  icon?: string
  coverImage?: string
  description?: string
  packageCount?: number
  sortOrder?: number
  status: 'active' | 'inactive'
  createdAt?: string
}
