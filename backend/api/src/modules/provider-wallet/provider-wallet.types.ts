import type { ProviderWalletSelect, ProviderWalletInsert } from './provider-wallet.schema.js';

export type ProviderWalletEntity = ProviderWalletSelect;

export type NewProviderWallet = ProviderWalletInsert;

export type UpdateProviderWallet = Partial<Omit<ProviderWalletEntity, 'id'>> & {
  id: string;
};

export interface IProviderWalletRepository {
  findById(id: string): Promise<ProviderWalletEntity | null>;
  findAll(params: ListProviderWalletParams): Promise<ListProviderWalletResult>;
  create(data: NewProviderWallet): Promise<ProviderWalletEntity>;
  update(data: UpdateProviderWallet): Promise<ProviderWalletEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListProviderWalletParams {
  cursor?: string;
  limit?: number;
  providerId?: string;

}

export interface ListProviderWalletResult {
  items: ProviderWalletEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
