import type { HotelUpsellOfferSelect, HotelUpsellOfferInsert } from './hotel-upsell-offer.schema.js';

export type HotelUpsellOfferEntity = HotelUpsellOfferSelect;

export type NewHotelUpsellOffer = HotelUpsellOfferInsert;

export type UpdateHotelUpsellOffer = Partial<Omit<HotelUpsellOfferEntity, 'id'>> & {
  id: string;
};

export interface IHotelUpsellOfferRepository {
  findById(id: string): Promise<HotelUpsellOfferEntity | null>;
  findAll(params: ListHotelUpsellOfferParams): Promise<ListHotelUpsellOfferResult>;
  create(data: NewHotelUpsellOffer): Promise<HotelUpsellOfferEntity>;
  update(data: UpdateHotelUpsellOffer): Promise<HotelUpsellOfferEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelUpsellOfferParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelUpsellOfferResult {
  items: HotelUpsellOfferEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
