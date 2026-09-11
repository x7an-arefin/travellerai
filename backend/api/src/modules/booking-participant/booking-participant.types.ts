import type { BookingParticipantSelect, BookingParticipantInsert } from './booking-participant.schema.js';

export type BookingParticipantEntity = BookingParticipantSelect;

export type NewBookingParticipant = BookingParticipantInsert;

export type UpdateBookingParticipant = Partial<Omit<BookingParticipantEntity, 'id'>> & {
  id: string;
};

export interface IBookingParticipantRepository {
  findById(id: string): Promise<BookingParticipantEntity | null>;
  findAll(params: ListBookingParticipantParams): Promise<ListBookingParticipantResult>;
  create(data: NewBookingParticipant): Promise<BookingParticipantEntity>;
  update(data: UpdateBookingParticipant): Promise<BookingParticipantEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListBookingParticipantParams {
  cursor?: string;
  limit?: number;
  bookingId?: string;

}

export interface ListBookingParticipantResult {
  items: BookingParticipantEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
