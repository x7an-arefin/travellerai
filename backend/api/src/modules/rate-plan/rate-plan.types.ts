import type { RatePlanSelect, RatePlanInsert } from './rate-plan.schema.js';

export type RatePlanEntity = RatePlanSelect;

export type NewRatePlan = RatePlanInsert;

export type UpdateRatePlan = Partial<Omit<RatePlanEntity, 'id'>> & {
  id: string;
};

export interface IRatePlanRepository {
  findById(id: string): Promise<RatePlanEntity | null>;
  findAll(params: ListRatePlanParams): Promise<ListRatePlanResult>;
  create(data: NewRatePlan): Promise<RatePlanEntity>;
  update(data: UpdateRatePlan): Promise<RatePlanEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListRatePlanParams {
  cursor?: string;
  limit?: number;

}

export interface ListRatePlanResult {
  items: RatePlanEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
