import type { VehicleReviewSelect, VehicleReviewInsert } from './vehicle-review.schema.js';

export type VehicleReviewEntity = VehicleReviewSelect;

export type NewVehicleReview = VehicleReviewInsert;

export type UpdateVehicleReview = Partial<Omit<VehicleReviewEntity, 'id'>> & {
  id: string;
};

export interface IVehicleReviewRepository {
  findById(id: string): Promise<VehicleReviewEntity | null>;
  findAll(params: ListVehicleReviewParams): Promise<ListVehicleReviewResult>;
  create(data: NewVehicleReview): Promise<VehicleReviewEntity>;
  update(data: UpdateVehicleReview): Promise<VehicleReviewEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleReviewParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleReviewResult {
  items: VehicleReviewEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
