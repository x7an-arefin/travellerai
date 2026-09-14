export type ReviewStatus = 'submitted' | 'published' | 'flagged' | 'hidden' | 'rejected'

export interface ReviewResponse {
  id: string
  reviewId: string
  providerId: string
  providerName?: string
  responseText: string
  status: 'published' | 'hidden'
  createdAt: string
  updatedAt?: string
}

export interface Review {
  id: string
  bookingId: string
  bookingReference?: string
  packageId: string
  packageTitle: string
  providerId: string
  providerName?: string
  travelerId: string
  travelerName: string
  travelerAvatar?: string
  overallRating: number
  packageRating?: number
  providerRating?: number
  guideRating?: number
  valueRating?: number
  serviceRating?: number
  title: string
  content: string
  photos?: string[]
  isVerifiedBooking: boolean
  status: ReviewStatus
  moderationNotes?: string
  publishedAt?: string
  response?: ReviewResponse
  createdAt: string
  updatedAt?: string
}
