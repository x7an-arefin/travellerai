import type { ItineraryItemSelect, ItineraryItemInsert } from './itinerary-item.schema.js';

export type ItineraryItemEntity = ItineraryItemSelect;

export type NewItineraryItem = ItineraryItemInsert;

export type UpdateItineraryItem = Partial<Omit<ItineraryItemEntity, 'id'>> & {
  id: string;
};

export interface IItineraryItemRepository {
  findById(id: string): Promise<ItineraryItemEntity | null>;
  findAll(params: ListItineraryItemParams): Promise<ListItineraryItemResult>;
  create(data: NewItineraryItem): Promise<ItineraryItemEntity>;
  update(data: UpdateItineraryItem): Promise<ItineraryItemEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListItineraryItemParams {
  cursor?: string;
  limit?: number;
  packageId?: string;

}

export interface ListItineraryItemResult {
  items: ItineraryItemEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
