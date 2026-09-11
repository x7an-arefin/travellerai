import type { ReviewResponseSelect, ReviewResponseInsert } from './review-response.schema.js';

export type ReviewResponseEntity = ReviewResponseSelect;

export type NewReviewResponse = ReviewResponseInsert;

export type UpdateReviewResponse = Partial<Omit<ReviewResponseEntity, 'id'>> & {
  id: string;
};

export interface IReviewResponseRepository {
  findById(id: string): Promise<ReviewResponseEntity | null>;
  findAll(params: ListReviewResponseParams): Promise<ListReviewResponseResult>;
  create(data: NewReviewResponse): Promise<ReviewResponseEntity>;
  update(data: UpdateReviewResponse): Promise<ReviewResponseEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListReviewResponseParams {
  cursor?: string;
  limit?: number;
  reviewId?: string;
  providerId?: string;
  status?: string;

}

export interface ListReviewResponseResult {
  items: ReviewResponseEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
