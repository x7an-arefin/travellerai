import type { LoyaltyAccountSelect, LoyaltyAccountInsert } from './loyalty-account.schema.js';

export type LoyaltyAccountEntity = LoyaltyAccountSelect;

export type NewLoyaltyAccount = LoyaltyAccountInsert;

export type UpdateLoyaltyAccount = Partial<Omit<LoyaltyAccountEntity, 'id'>> & {
  id: string;
};

export interface ILoyaltyAccountRepository {
  findById(id: string): Promise<LoyaltyAccountEntity | null>;
  findAll(params: ListLoyaltyAccountParams): Promise<ListLoyaltyAccountResult>;
  create(data: NewLoyaltyAccount): Promise<LoyaltyAccountEntity>;
  update(data: UpdateLoyaltyAccount): Promise<LoyaltyAccountEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListLoyaltyAccountParams {
  cursor?: string;
  limit?: number;
  userId?: string;
  tier?: string;

}

export interface ListLoyaltyAccountResult {
  items: LoyaltyAccountEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
