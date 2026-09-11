import type { BookingAddonItemSelect, BookingAddonItemInsert } from './booking-addon-item.schema.js';

export type BookingAddonItemEntity = BookingAddonItemSelect;

export type NewBookingAddonItem = BookingAddonItemInsert;

export type UpdateBookingAddonItem = Partial<Omit<BookingAddonItemEntity, 'id'>> & {
  id: string;
};

export interface IBookingAddonItemRepository {
  findById(id: string): Promise<BookingAddonItemEntity | null>;
  findAll(params: ListBookingAddonItemParams): Promise<ListBookingAddonItemResult>;
  create(data: NewBookingAddonItem): Promise<BookingAddonItemEntity>;
  update(data: UpdateBookingAddonItem): Promise<BookingAddonItemEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListBookingAddonItemParams {
  cursor?: string;
  limit?: number;
  bookingId?: string;

}

export interface ListBookingAddonItemResult {
  items: BookingAddonItemEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
