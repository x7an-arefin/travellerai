import type { DestinationSelect, DestinationInsert } from './destination.schema.js';

export type DestinationEntity = DestinationSelect;

export type NewDestination = DestinationInsert;

export type UpdateDestination = Partial<Omit<DestinationEntity, 'id'>> & {
  id: string;
};

export interface IDestinationRepository {
  findById(id: string): Promise<DestinationEntity | null>;
  findAll(params: ListDestinationParams): Promise<ListDestinationResult>;
  create(data: NewDestination): Promise<DestinationEntity>;
  update(data: UpdateDestination): Promise<DestinationEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListDestinationParams {
  cursor?: string;
  limit?: number;
  country?: string;
  status?: string;
  isFeatured?: string;

}

export interface ListDestinationResult {
  items: DestinationEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
