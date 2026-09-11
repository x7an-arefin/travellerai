import type { AffiliateAccountSelect, AffiliateAccountInsert } from './affiliate-account.schema.js';

export type AffiliateAccountEntity = AffiliateAccountSelect;

export type NewAffiliateAccount = AffiliateAccountInsert;

export type UpdateAffiliateAccount = Partial<Omit<AffiliateAccountEntity, 'id'>> & {
  id: string;
};

export interface IAffiliateAccountRepository {
  findById(id: string): Promise<AffiliateAccountEntity | null>;
  findAll(params: ListAffiliateAccountParams): Promise<ListAffiliateAccountResult>;
  create(data: NewAffiliateAccount): Promise<AffiliateAccountEntity>;
  update(data: UpdateAffiliateAccount): Promise<AffiliateAccountEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListAffiliateAccountParams {
  cursor?: string;
  limit?: number;
  status?: string;

}

export interface ListAffiliateAccountResult {
  items: AffiliateAccountEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
