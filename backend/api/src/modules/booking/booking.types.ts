import type { BookingSelect, BookingInsert } from './booking.schema.js';

export type BookingEntity = BookingSelect;

export type NewBooking = BookingInsert;

export type UpdateBooking = Partial<Omit<BookingEntity, 'id'>> & {
  id: string;
};

export interface IBookingRepository {
  findById(id: string): Promise<BookingEntity | null>;
  findAll(params: ListBookingParams): Promise<ListBookingResult>;
  create(data: NewBooking): Promise<BookingEntity>;
  update(data: UpdateBooking): Promise<BookingEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListBookingParams {
  cursor?: string;
  limit?: number;
  travelerId?: string;
  packageId?: string;
  departureId?: string;
  bookingStatus?: string;
  checkinStatus?: string;

}

export interface ListBookingResult {
  items: BookingEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
