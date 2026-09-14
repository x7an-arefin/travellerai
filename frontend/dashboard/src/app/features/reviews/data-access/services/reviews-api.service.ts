import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { Review, ReviewResponse } from '../models/reviews.model'
import { UpdateReviewStatusInput, CreateReviewResponseInput, ReviewListResponse } from '../models/reviews-api.types'

@Injectable({
  providedIn: 'root',
})
export class ReviewsApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly baseUrl = this.apiConfig.buildUrl('reviews')
  private readonly responsesUrl = this.apiConfig.buildUrl('review-responses')

  private mockReviews: Review[] = [
    {
      id: 'rev-001',
      bookingId: 'bk-swiss-901',
      bookingReference: 'BK-SWISS-901',
      packageId: 'pkg-1',
      packageTitle: 'Swiss Alps Expedition: Matterhorn & Zermatt Trek',
      providerId: 'prov-alpine',
      providerName: 'Alpine Wonders Agency',
      travelerId: 'usr-emma',
      travelerName: 'Emma Richardson',
      travelerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      overallRating: 5,
      packageRating: 5,
      providerRating: 5,
      guideRating: 5,
      serviceRating: 5,
      valueRating: 5,
      title: 'Unbelievable Matterhorn Sunrise & Phenomenal Guide!',
      content: 'Marco Rossi was an exceptional mountain leader. Every hut reservation, fondue dinner, and glacier crampon check was flawless. Will definitely book again through Traveller AI.',
      isVerifiedBooking: true,
      status: 'published',
      publishedAt: '2025-06-20T10:00:00.000Z',
      createdAt: '2025-06-19T18:00:00.000Z',
      response: {
        id: 'resp-001',
        reviewId: 'rev-001',
        providerId: 'prov-alpine',
        providerName: 'Alpine Wonders Agency',
        responseText: 'Thank you so much Emma! Marco was thrilled to lead your group. Safe travels on your next journey!',
        status: 'published',
        createdAt: '2025-06-20T14:00:00.000Z',
      },
    },
    {
      id: 'rev-002',
      bookingId: 'bk-kyoto-401',
      bookingReference: 'BK-KYOTO-401',
      packageId: 'pkg-2',
      packageTitle: 'Kyoto Zen Temples & Arashiyama Bamboo Trail',
      providerId: 'prov-kyoto',
      providerName: 'Zen Heritage Expeditions',
      travelerId: 'usr-liam',
      travelerName: 'Liam Vance',
      travelerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      overallRating: 4,
      packageRating: 4,
      providerRating: 4,
      guideRating: 5,
      serviceRating: 4,
      valueRating: 4,
      title: 'Serene temple walks, slight rain on bamboo grove day',
      content: 'Takashi was deeply knowledgeable about the Buddhist heritage and Zen dry gardens. Umbrella provided on rainy morning. High quality cultural tour.',
      isVerifiedBooking: true,
      status: 'published',
      publishedAt: '2025-10-22T08:30:00.000Z',
      createdAt: '2025-10-21T19:20:00.000Z',
    },
    {
      id: 'rev-003',
      bookingId: 'bk-amalfi-201',
      bookingReference: 'BK-AMALFI-201',
      packageId: 'pkg-3',
      packageTitle: 'Amalfi Coast Luxury Cliffside & Capri Yacht Cruise',
      providerId: 'prov-amalfi',
      providerName: 'Capri & Coast Maritime',
      travelerId: 'usr-marcus',
      travelerName: 'Marcus Brody',
      overallRating: 2,
      packageRating: 2,
      providerRating: 2,
      guideRating: 3,
      serviceRating: 2,
      valueRating: 2,
      title: 'Yacht departure was delayed 45 minutes due to harbor swell',
      content: 'The sea was choppy and we waited at Positano dock longer than anticipated. Yacht itself was pristine and prosecco was served, but communication could have been clearer beforehand.',
      isVerifiedBooking: true,
      status: 'flagged',
      moderationNotes: 'Operator requested review of sea condition safety protocols cited by traveler.',
      createdAt: '2025-09-27T11:00:00.000Z',
    },
    {
      id: 'rev-004',
      bookingId: 'bk-bali-701',
      bookingReference: 'BK-BALI-701',
      packageId: 'pkg-4',
      packageTitle: 'Bali Sacred Volcano Trek & Ubud Cultural Retreat',
      providerId: 'prov-bali',
      providerName: 'Bali Eco Expeditions',
      travelerId: 'usr-sophia',
      travelerName: 'Sophia Lindqvist',
      overallRating: 5,
      title: 'Batur Sunrise was the highlight of our year!',
      content: 'Early morning climb was worth every step. Wayan brought warm banana pancakes at the caldera rim. Incredible experience.',
      isVerifiedBooking: true,
      status: 'submitted',
      createdAt: '2025-11-04T09:15:00.000Z',
    },
  ]

  async list(status?: string): Promise<{ ok: true; data: ReviewListResponse } | { ok: false; error: string }> {
    try {
      const query = status && status !== 'all' ? `?status=${status}` : ''
      const res = await firstValueFrom(this.http.get<ReviewListResponse>(`${this.baseUrl}${query}`))
      return { ok: true, data: res }
    } catch {
      let filtered = [...this.mockReviews]
      if (status && status !== 'all') {
        filtered = filtered.filter(r => r.status === status)
      }
      const avg = filtered.length
        ? filtered.reduce((sum, r) => sum + r.overallRating, 0) / filtered.length
        : 5.0
      return {
        ok: true,
        data: {
          items: filtered,
          total: filtered.length,
          averageRating: Number(avg.toFixed(1)),
        },
      }
    }
  }

  async updateStatus(id: string, input: UpdateReviewStatusInput): Promise<{ ok: true; data: Review } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.patch<Review>(`${this.baseUrl}/${id}/status`, input))
      return { ok: true, data: res }
    } catch {
      const idx = this.mockReviews.findIndex(r => r.id === id)
      if (idx !== -1) {
        this.mockReviews[idx] = {
          ...this.mockReviews[idx],
          status: input.status,
          moderationNotes: input.moderationNotes,
          publishedAt: input.status === 'published' ? new Date().toISOString() : this.mockReviews[idx].publishedAt,
          updatedAt: new Date().toISOString(),
        }
        return { ok: true, data: this.mockReviews[idx] }
      }
      return { ok: false, error: 'Review not found' }
    }
  }

  async createResponse(input: CreateReviewResponseInput): Promise<{ ok: true; data: ReviewResponse } | { ok: false; error: string }> {
    try {
      const res = await firstValueFrom(this.http.post<ReviewResponse>(this.responsesUrl, input))
      return { ok: true, data: res }
    } catch {
      const newResp: ReviewResponse = {
        id: `resp-${Date.now()}`,
        reviewId: input.reviewId,
        providerId: input.providerId,
        responseText: input.responseText,
        status: 'published',
        createdAt: new Date().toISOString(),
      }
      const rev = this.mockReviews.find(r => r.id === input.reviewId)
      if (rev) {
        rev.response = newResp
      }
      return { ok: true, data: newResp }
    }
  }

  async remove(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
      return { ok: true }
    } catch {
      this.mockReviews = this.mockReviews.filter(r => r.id !== id)
      return { ok: true }
    }
  }
}
