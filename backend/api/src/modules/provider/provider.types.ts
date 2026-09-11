import type { ProviderSelect, ProviderInsert } from './provider.schema.js';

export type ProviderEntity = ProviderSelect;

export type NewProvider = ProviderInsert;

export type UpdateProvider = Partial<Omit<ProviderEntity, 'id'>> & {
  id: string;
};

export interface IProviderRepository {
  findById(id: string): Promise<ProviderEntity | null>;
  findAll(params: ListProviderParams): Promise<ListProviderResult>;
  create(data: NewProvider): Promise<ProviderEntity>;
  update(data: UpdateProvider): Promise<ProviderEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListProviderParams {
  cursor?: string;
  limit?: number;
  providerType?: string;
  approvalStatus?: string;
  country?: string;
  kycStatus?: string;

}

export interface ListProviderResult {
  items: ProviderEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
