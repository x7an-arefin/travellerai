import type { ProviderQuotationSelect, ProviderQuotationInsert } from './provider-quotation.schema.js';

export type ProviderQuotationEntity = ProviderQuotationSelect;

export type NewProviderQuotation = ProviderQuotationInsert;

export type UpdateProviderQuotation = Partial<Omit<ProviderQuotationEntity, 'id'>> & {
  id: string;
};

export interface IProviderQuotationRepository {
  findById(id: string): Promise<ProviderQuotationEntity | null>;
  findAll(params: ListProviderQuotationParams): Promise<ListProviderQuotationResult>;
  create(data: NewProviderQuotation): Promise<ProviderQuotationEntity>;
  update(data: UpdateProviderQuotation): Promise<ProviderQuotationEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListProviderQuotationParams {
  cursor?: string;
  limit?: number;
  inquiryId?: string;
  providerId?: string;
  status?: string;

}

export interface ListProviderQuotationResult {
  items: ProviderQuotationEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
