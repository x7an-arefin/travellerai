import type { ProviderPayoutAccountSelect, ProviderPayoutAccountInsert } from './provider-payout-account.schema.js';

export type ProviderPayoutAccountEntity = ProviderPayoutAccountSelect;

export type NewProviderPayoutAccount = ProviderPayoutAccountInsert;

export type UpdateProviderPayoutAccount = Partial<Omit<ProviderPayoutAccountEntity, 'id'>> & {
  id: string;
};

export interface IProviderPayoutAccountRepository {
  findById(id: string): Promise<ProviderPayoutAccountEntity | null>;
  findAll(params: ListProviderPayoutAccountParams): Promise<ListProviderPayoutAccountResult>;
  create(data: NewProviderPayoutAccount): Promise<ProviderPayoutAccountEntity>;
  update(data: UpdateProviderPayoutAccount): Promise<ProviderPayoutAccountEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListProviderPayoutAccountParams {
  cursor?: string;
  limit?: number;
  providerId?: string;
  status?: string;

}

export interface ListProviderPayoutAccountResult {
  items: ProviderPayoutAccountEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
