import type { VehiclePricingPlanSelect, VehiclePricingPlanInsert } from './vehicle-pricing-plan.schema.js';

export type VehiclePricingPlanEntity = VehiclePricingPlanSelect;

export type NewVehiclePricingPlan = VehiclePricingPlanInsert;

export type UpdateVehiclePricingPlan = Partial<Omit<VehiclePricingPlanEntity, 'id'>> & {
  id: string;
};

export interface IVehiclePricingPlanRepository {
  findById(id: string): Promise<VehiclePricingPlanEntity | null>;
  findAll(params: ListVehiclePricingPlanParams): Promise<ListVehiclePricingPlanResult>;
  create(data: NewVehiclePricingPlan): Promise<VehiclePricingPlanEntity>;
  update(data: UpdateVehiclePricingPlan): Promise<VehiclePricingPlanEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehiclePricingPlanParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehiclePricingPlanResult {
  items: VehiclePricingPlanEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
