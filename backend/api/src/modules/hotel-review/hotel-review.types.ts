import type { HotelReviewSelect, HotelReviewInsert } from './hotel-review.schema.js';

export type HotelReviewEntity = HotelReviewSelect;

export type NewHotelReview = HotelReviewInsert;

export type UpdateHotelReview = Partial<Omit<HotelReviewEntity, 'id'>> & {
  id: string;
};

export interface IHotelReviewRepository {
  findById(id: string): Promise<HotelReviewEntity | null>;
  findAll(params: ListHotelReviewParams): Promise<ListHotelReviewResult>;
  create(data: NewHotelReview): Promise<HotelReviewEntity>;
  update(data: UpdateHotelReview): Promise<HotelReviewEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelReviewParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelReviewResult {
  items: HotelReviewEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
