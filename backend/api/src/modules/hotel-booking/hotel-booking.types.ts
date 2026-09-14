import type { HotelBookingSelect, HotelBookingInsert } from './hotel-booking.schema.js';

export type HotelBookingEntity = HotelBookingSelect;

export type NewHotelBooking = HotelBookingInsert;

export type UpdateHotelBooking = Partial<Omit<HotelBookingEntity, 'id'>> & {
  id: string;
};

export interface IHotelBookingRepository {
  findById(id: string): Promise<HotelBookingEntity | null>;
  findAll(params: ListHotelBookingParams): Promise<ListHotelBookingResult>;
  create(data: NewHotelBooking): Promise<HotelBookingEntity>;
  update(data: UpdateHotelBooking): Promise<HotelBookingEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelBookingParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelBookingResult {
  items: HotelBookingEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
