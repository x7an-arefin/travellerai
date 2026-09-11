import type { SupportTicketSelect, SupportTicketInsert } from './support-ticket.schema.js';

export type SupportTicketEntity = SupportTicketSelect;

export type NewSupportTicket = SupportTicketInsert;

export type UpdateSupportTicket = Partial<Omit<SupportTicketEntity, 'id'>> & {
  id: string;
};

export interface ISupportTicketRepository {
  findById(id: string): Promise<SupportTicketEntity | null>;
  findAll(params: ListSupportTicketParams): Promise<ListSupportTicketResult>;
  create(data: NewSupportTicket): Promise<SupportTicketEntity>;
  update(data: UpdateSupportTicket): Promise<SupportTicketEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListSupportTicketParams {
  cursor?: string;
  limit?: number;
  userId?: string;
  status?: string;
  priority?: string;
  assignedAgentId?: string;

}

export interface ListSupportTicketResult {
  items: SupportTicketEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
