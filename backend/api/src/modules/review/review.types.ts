import type { ReviewSelect, ReviewInsert } from './review.schema.js';

export type ReviewEntity = ReviewSelect;

export type NewReview = ReviewInsert;

export type UpdateReview = Partial<Omit<ReviewEntity, 'id'>> & {
  id: string;
};

export interface IReviewRepository {
  findById(id: string): Promise<ReviewEntity | null>;
  findAll(params: ListReviewParams): Promise<ListReviewResult>;
  create(data: NewReview): Promise<ReviewEntity>;
  update(data: UpdateReview): Promise<ReviewEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListReviewParams {
  cursor?: string;
  limit?: number;
  packageId?: string;
  providerId?: string;
  travelerId?: string;
  status?: string;

}

export interface ListReviewResult {
  items: ReviewEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
