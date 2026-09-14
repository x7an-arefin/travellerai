import type { HotelMaintenanceTicketSelect, HotelMaintenanceTicketInsert } from './hotel-maintenance-ticket.schema.js';

export type HotelMaintenanceTicketEntity = HotelMaintenanceTicketSelect;

export type NewHotelMaintenanceTicket = HotelMaintenanceTicketInsert;

export type UpdateHotelMaintenanceTicket = Partial<Omit<HotelMaintenanceTicketEntity, 'id'>> & {
  id: string;
};

export interface IHotelMaintenanceTicketRepository {
  findById(id: string): Promise<HotelMaintenanceTicketEntity | null>;
  findAll(params: ListHotelMaintenanceTicketParams): Promise<ListHotelMaintenanceTicketResult>;
  create(data: NewHotelMaintenanceTicket): Promise<HotelMaintenanceTicketEntity>;
  update(data: UpdateHotelMaintenanceTicket): Promise<HotelMaintenanceTicketEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListHotelMaintenanceTicketParams {
  cursor?: string;
  limit?: number;

}

export interface ListHotelMaintenanceTicketResult {
  items: HotelMaintenanceTicketEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
