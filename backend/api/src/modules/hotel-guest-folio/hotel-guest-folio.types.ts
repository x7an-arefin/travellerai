import type { HotelGuestFolioSelect, HotelGuestFolioInsert } from './hotel-guest-folio.schema.js';

export type HotelGuestFolioEntity = HotelGuestFolioSelect;

export type NewHotelGuestFolio = HotelGuestFolioInsert;

export type UpdateHotelGuestFolio = Partial<Omit<HotelGuestFolioEntity, 'id'>> & {
  id: string;
};

export interface IHotelGuestFolioRepository {
  findById(id: string): Promise<HotelGuestFolioEntity | null>;
  findAll(params: ListHotelGuestFolioParams): Promise<ListHotelGuestFolioResult>;
  create(data: NewHotelGuestFolio): Promise<HotelGuestFolioEntity>;
  update(data: UpdateHotelGuestFolio): Promise<HotelGuestFolioEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelGuestFolioParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelGuestFolioResult {
  items: HotelGuestFolioEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
