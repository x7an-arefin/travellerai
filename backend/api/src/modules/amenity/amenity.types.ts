import type { AmenitySelect, AmenityInsert } from './amenity.schema.js';

export type AmenityEntity = AmenitySelect;

export type NewAmenity = AmenityInsert;

export type UpdateAmenity = Partial<Omit<AmenityEntity, 'id'>> & {
  id: string;
};

export interface IAmenityRepository {
  findById(id: string): Promise<AmenityEntity | null>;
  findAll(params: ListAmenityParams): Promise<ListAmenityResult>;
  create(data: NewAmenity): Promise<AmenityEntity>;
  update(data: UpdateAmenity): Promise<AmenityEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListAmenityParams {
  cursor?: string;
  limit?: number;
  category?: string;
  status?: string;

}

export interface ListAmenityResult {
  items: AmenityEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
