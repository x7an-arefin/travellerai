export interface ItineraryDay {
  day: number
  title: string
  description?: string
  startLocation?: string
  endLocation?: string
  meals?: string[]
  accommodation?: string
}

export interface PackageFaqItem {
  question: string
  answer: string
}

export interface Package {
  id: string
  providerId?: string
  categoryId?: string
  destinationId: string
  title: string
  slug?: string
  shortDescription?: string
  description?: string
  productType: 'fixed_tour' | 'flexible_tour' | 'day_trip' | 'multi_day_package' | 'activity' | 'adventure'
  durationHours?: number
  durationDays: number
  minParticipants?: number
  maxParticipants: number
  minAge?: number
  maxAge?: number
  difficultyLevel?: 'easy' | 'moderate' | 'challenging' | 'strenuous'
  confirmationType?: 'instant' | 'manual'
  cancellationPolicy?: 'flexible' | 'moderate' | 'strict'
  basePrice: number
  currency: string
  featuredImage?: string
  rating?: number
  reviewCount?: number
  totalBookings?: number
  status: 'draft' | 'under_review' | 'published' | 'suspended' | 'archived'
  isFeatured?: boolean
  meetingPoint?: string
  departureLocation?: string
  returnLocation?: string
  inclusions?: string[]
  exclusions?: string[]
  amenities?: string[]
  languages?: string[]
  itinerary?: ItineraryDay[]
  faqs?: PackageFaqItem[]
  createdAt?: string
  updatedAt?: string
}

