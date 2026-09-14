import type { InventoryCalendarSelect, InventoryCalendarInsert } from './inventory-calendar.schema.js';

export type InventoryCalendarEntity = InventoryCalendarSelect;

export type NewInventoryCalendar = InventoryCalendarInsert;

export type UpdateInventoryCalendar = Partial<Omit<InventoryCalendarEntity, 'id'>> & {
  id: string;
};

export interface IInventoryCalendarRepository {
  findById(id: string): Promise<InventoryCalendarEntity | null>;
  findAll(params: ListInventoryCalendarParams): Promise<ListInventoryCalendarResult>;
  create(data: NewInventoryCalendar): Promise<InventoryCalendarEntity>;
  update(data: UpdateInventoryCalendar): Promise<InventoryCalendarEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListInventoryCalendarParams {
  cursor?: string;
  limit?: number;

}

export interface ListInventoryCalendarResult {
  items: InventoryCalendarEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
