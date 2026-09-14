import type { VehicleProtectionPlanSelect, VehicleProtectionPlanInsert } from './vehicle-protection-plan.schema.js';

export type VehicleProtectionPlanEntity = VehicleProtectionPlanSelect;

export type NewVehicleProtectionPlan = VehicleProtectionPlanInsert;

export type UpdateVehicleProtectionPlan = Partial<Omit<VehicleProtectionPlanEntity, 'id'>> & {
  id: string;
};

export interface IVehicleProtectionPlanRepository {
  findById(id: string): Promise<VehicleProtectionPlanEntity | null>;
  findAll(params: ListVehicleProtectionPlanParams): Promise<ListVehicleProtectionPlanResult>;
  create(data: NewVehicleProtectionPlan): Promise<VehicleProtectionPlanEntity>;
  update(data: UpdateVehicleProtectionPlan): Promise<VehicleProtectionPlanEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleProtectionPlanParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleProtectionPlanResult {
  items: VehicleProtectionPlanEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
