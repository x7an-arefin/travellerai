import type { WaitlistSelect, WaitlistInsert } from './waitlist.schema.js';

export type WaitlistEntity = WaitlistSelect;

export type NewWaitlist = WaitlistInsert;

export type UpdateWaitlist = Partial<Omit<WaitlistEntity, 'id'>> & {
  id: string;
};

export interface IWaitlistRepository {
  findById(id: string): Promise<WaitlistEntity | null>;
  findAll(params: ListWaitlistParams): Promise<ListWaitlistResult>;
  create(data: NewWaitlist): Promise<WaitlistEntity>;
  update(data: UpdateWaitlist): Promise<WaitlistEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListWaitlistParams {
  cursor?: string;
  limit?: number;
  departureId?: string;
  status?: string;

}

export interface ListWaitlistResult {
  items: WaitlistEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
