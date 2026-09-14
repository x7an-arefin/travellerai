import type { HotelBookingRoomSelect, HotelBookingRoomInsert } from './hotel-booking-room.schema.js';

export type HotelBookingRoomEntity = HotelBookingRoomSelect;

export type NewHotelBookingRoom = HotelBookingRoomInsert;

export type UpdateHotelBookingRoom = Partial<Omit<HotelBookingRoomEntity, 'id'>> & {
  id: string;
};

export interface IHotelBookingRoomRepository {
  findById(id: string): Promise<HotelBookingRoomEntity | null>;
  findAll(params: ListHotelBookingRoomParams): Promise<ListHotelBookingRoomResult>;
  create(data: NewHotelBookingRoom): Promise<HotelBookingRoomEntity>;
  update(data: UpdateHotelBookingRoom): Promise<HotelBookingRoomEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelBookingRoomParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelBookingRoomResult {
  items: HotelBookingRoomEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
