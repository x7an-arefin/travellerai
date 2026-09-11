import type { TripInquirySelect, TripInquiryInsert } from './trip-inquiry.schema.js';

export type TripInquiryEntity = TripInquirySelect;

export type NewTripInquiry = TripInquiryInsert;

export type UpdateTripInquiry = Partial<Omit<TripInquiryEntity, 'id'>> & {
  id: string;
};

export interface ITripInquiryRepository {
  findById(id: string): Promise<TripInquiryEntity | null>;
  findAll(params: ListTripInquiryParams): Promise<ListTripInquiryResult>;
  create(data: NewTripInquiry): Promise<TripInquiryEntity>;
  update(data: UpdateTripInquiry): Promise<TripInquiryEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListTripInquiryParams {
  cursor?: string;
  limit?: number;
  travelerId?: string;
  destinationId?: string;
  status?: string;

}

export interface ListTripInquiryResult {
  items: TripInquiryEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
