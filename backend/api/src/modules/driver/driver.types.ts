import type { DriverSelect, DriverInsert } from './driver.schema.js';

export type DriverEntity = DriverSelect;

export type NewDriver = DriverInsert;

export type UpdateDriver = Partial<Omit<DriverEntity, 'id'>> & {
  id: string;
};

export interface IDriverRepository {
  findById(id: string): Promise<DriverEntity | null>;
  findAll(params: ListDriverParams): Promise<ListDriverResult>;
  create(data: NewDriver): Promise<DriverEntity>;
  update(data: UpdateDriver): Promise<DriverEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListDriverParams {
  cursor?: string;
  limit?: number;

}

export interface ListDriverResult {
  items: DriverEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
