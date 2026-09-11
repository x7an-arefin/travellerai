import type { TicketMessageSelect, TicketMessageInsert } from './ticket-message.schema.js';

export type TicketMessageEntity = TicketMessageSelect;

export type NewTicketMessage = TicketMessageInsert;

export type UpdateTicketMessage = Partial<Omit<TicketMessageEntity, 'id'>> & {
  id: string;
};

export interface ITicketMessageRepository {
  findById(id: string): Promise<TicketMessageEntity | null>;
  findAll(params: ListTicketMessageParams): Promise<ListTicketMessageResult>;
  create(data: NewTicketMessage): Promise<TicketMessageEntity>;
  update(data: UpdateTicketMessage): Promise<TicketMessageEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListTicketMessageParams {
  cursor?: string;
  limit?: number;
  ticketId?: string;
  isInternalNote?: string;

}

export interface ListTicketMessageResult {
  items: TicketMessageEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
