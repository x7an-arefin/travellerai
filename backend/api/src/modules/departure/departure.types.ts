import type { DepartureSelect, DepartureInsert } from './departure.schema.js';

export type DepartureEntity = DepartureSelect;

export type NewDeparture = DepartureInsert;

export type UpdateDeparture = Partial<Omit<DepartureEntity, 'id'>> & {
  id: string;
};

export interface IDepartureRepository {
  findById(id: string): Promise<DepartureEntity | null>;
  findAll(params: ListDepartureParams): Promise<ListDepartureResult>;
  create(data: NewDeparture): Promise<DepartureEntity>;
  update(data: UpdateDeparture): Promise<DepartureEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListDepartureParams {
  cursor?: string;
  limit?: number;
  packageId?: string;
  status?: string;

}

export interface ListDepartureResult {
  items: DepartureEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
