import type { HotelPropertySelect, HotelPropertyInsert } from './hotel-property.schema.js';

export type HotelPropertyEntity = HotelPropertySelect;

export type NewHotelProperty = HotelPropertyInsert;

export type UpdateHotelProperty = Partial<Omit<HotelPropertyEntity, 'id'>> & {
  id: string;
};

export interface IHotelPropertyRepository {
  findById(id: string): Promise<HotelPropertyEntity | null>;
  findAll(params: ListHotelPropertyParams): Promise<ListHotelPropertyResult>;
  create(data: NewHotelProperty): Promise<HotelPropertyEntity>;
  update(data: UpdateHotelProperty): Promise<HotelPropertyEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelPropertyParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelPropertyResult {
  items: HotelPropertyEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
