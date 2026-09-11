import type { ExchangeRateSelect, ExchangeRateInsert } from './exchange-rate.schema.js';

export type ExchangeRateEntity = ExchangeRateSelect;

export type NewExchangeRate = ExchangeRateInsert;

export type UpdateExchangeRate = Partial<Omit<ExchangeRateEntity, 'id'>> & {
  id: string;
};

export interface IExchangeRateRepository {
  findById(id: string): Promise<ExchangeRateEntity | null>;
  findAll(params: ListExchangeRateParams): Promise<ListExchangeRateResult>;
  create(data: NewExchangeRate): Promise<ExchangeRateEntity>;
  update(data: UpdateExchangeRate): Promise<ExchangeRateEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListExchangeRateParams {
  cursor?: string;
  limit?: number;
  fromCurrency?: string;
  toCurrency?: string;

}

export interface ListExchangeRateResult {
  items: ExchangeRateEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
