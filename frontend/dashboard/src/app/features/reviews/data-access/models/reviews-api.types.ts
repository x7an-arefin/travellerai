import { Review, ReviewResponse } from './reviews.model'

export type UpdateReviewStatusInput = {
  status: 'submitted' | 'published' | 'flagged' | 'hidden' | 'rejected'
  moderationNotes?: string
}

export type CreateReviewResponseInput = {
  reviewId: string
  providerId: string
  responseText: string
}

export interface ReviewListResponse {
  items: Review[]
  total?: number
  averageRating?: number
  nextCursor?: string | null
}
