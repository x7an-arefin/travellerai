import type { DisputeSelect, DisputeInsert } from './dispute.schema.js';

export type DisputeEntity = DisputeSelect;

export type NewDispute = DisputeInsert;

export type UpdateDispute = Partial<Omit<DisputeEntity, 'id'>> & {
  id: string;
};

export interface IDisputeRepository {
  findById(id: string): Promise<DisputeEntity | null>;
  findAll(params: ListDisputeParams): Promise<ListDisputeResult>;
  create(data: NewDispute): Promise<DisputeEntity>;
  update(data: UpdateDispute): Promise<DisputeEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListDisputeParams {
  cursor?: string;
  limit?: number;
  bookingId?: string;
  status?: string;
  assignedAgentId?: string;

}

export interface ListDisputeResult {
  items: DisputeEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
