export interface Destination {
  id: string
  name: string
  slug: string
  country: string
  countryCode?: string
  stateRegion?: string
  description?: string
  travelGuide?: string
  coverImage?: string
  gallery?: string[]
  latitude?: number
  longitude?: number
  weatherInfo?: {
    bestTimeToVisit?: string
    averageTemp?: string
    rainyMonths?: string
  }
  visaInfo?: string
  safetyInfo?: string
  activePackagesCount?: number
  isFeatured: boolean
  sortOrder?: number
  status: 'active' | 'inactive' | 'draft'
  metaTitle?: string
  metaDescription?: string
  createdAt?: string
}
