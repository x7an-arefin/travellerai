import type { PriceRuleSelect, PriceRuleInsert } from './price-rule.schema.js';

export type PriceRuleEntity = PriceRuleSelect;

export type NewPriceRule = PriceRuleInsert;

export type UpdatePriceRule = Partial<Omit<PriceRuleEntity, 'id'>> & {
  id: string;
};

export interface IPriceRuleRepository {
  findById(id: string): Promise<PriceRuleEntity | null>;
  findAll(params: ListPriceRuleParams): Promise<ListPriceRuleResult>;
  create(data: NewPriceRule): Promise<PriceRuleEntity>;
  update(data: UpdatePriceRule): Promise<PriceRuleEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListPriceRuleParams {
  cursor?: string;
  limit?: number;
  packageId?: string;
  departureId?: string;
  pricingType?: string;
  seasonType?: string;
  status?: string;

}

export interface ListPriceRuleResult {
  items: PriceRuleEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
