import { Package } from './packages.model'

export type NewPackage = Omit<Package, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'totalBookings'>
export type UpdatePackage = Partial<NewPackage>

export interface PackageListResponse {
  items: Package[]
  nextCursor?: string | null
  hasMore?: boolean
  total?: number
}
