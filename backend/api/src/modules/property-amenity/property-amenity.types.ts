import type { PropertyAmenitySelect, PropertyAmenityInsert } from './property-amenity.schema.js';

export type PropertyAmenityEntity = PropertyAmenitySelect;

export type NewPropertyAmenity = PropertyAmenityInsert;

export type UpdatePropertyAmenity = Partial<Omit<PropertyAmenityEntity, 'id'>> & {
  id: string;
};

export interface IPropertyAmenityRepository {
  findById(id: string): Promise<PropertyAmenityEntity | null>;
  findAll(params: ListPropertyAmenityParams): Promise<ListPropertyAmenityResult>;
  create(data: NewPropertyAmenity): Promise<PropertyAmenityEntity>;
  update(data: UpdatePropertyAmenity): Promise<PropertyAmenityEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListPropertyAmenityParams {
  cursor?: string;
  limit?: number;

}

export interface ListPropertyAmenityResult {
  items: PropertyAmenityEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
