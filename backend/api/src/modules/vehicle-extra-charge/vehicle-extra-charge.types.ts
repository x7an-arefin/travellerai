import type { VehicleExtraChargeSelect, VehicleExtraChargeInsert } from './vehicle-extra-charge.schema.js';

export type VehicleExtraChargeEntity = VehicleExtraChargeSelect;

export type NewVehicleExtraCharge = VehicleExtraChargeInsert;

export type UpdateVehicleExtraCharge = Partial<Omit<VehicleExtraChargeEntity, 'id'>> & {
  id: string;
};

export interface IVehicleExtraChargeRepository {
  findById(id: string): Promise<VehicleExtraChargeEntity | null>;
  findAll(params: ListVehicleExtraChargeParams): Promise<ListVehicleExtraChargeResult>;
  create(data: NewVehicleExtraCharge): Promise<VehicleExtraChargeEntity>;
  update(data: UpdateVehicleExtraCharge): Promise<VehicleExtraChargeEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleExtraChargeParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleExtraChargeResult {
  items: VehicleExtraChargeEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
