import type { HotelUpsellConversionSelect, HotelUpsellConversionInsert } from './hotel-upsell-conversion.schema.js';

export type HotelUpsellConversionEntity = HotelUpsellConversionSelect;

export type NewHotelUpsellConversion = HotelUpsellConversionInsert;

export type UpdateHotelUpsellConversion = Partial<Omit<HotelUpsellConversionEntity, 'id'>> & {
  id: string;
};

export interface IHotelUpsellConversionRepository {
  findById(id: string): Promise<HotelUpsellConversionEntity | null>;
  findAll(params: ListHotelUpsellConversionParams): Promise<ListHotelUpsellConversionResult>;
  create(data: NewHotelUpsellConversion): Promise<HotelUpsellConversionEntity>;
  update(data: UpdateHotelUpsellConversion): Promise<HotelUpsellConversionEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelUpsellConversionParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelUpsellConversionResult {
  items: HotelUpsellConversionEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
