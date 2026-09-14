import type { VehicleSelect, VehicleInsert } from './vehicle.schema.js';

export type VehicleEntity = VehicleSelect;

export type NewVehicle = VehicleInsert;

export type UpdateVehicle = Partial<Omit<VehicleEntity, 'id'>> & {
  id: string;
};

export interface IVehicleRepository {
  findById(id: string): Promise<VehicleEntity | null>;
  findAll(params: ListVehicleParams): Promise<ListVehicleResult>;
  create(data: NewVehicle): Promise<VehicleEntity>;
  update(data: UpdateVehicle): Promise<VehicleEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleResult {
  items: VehicleEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
