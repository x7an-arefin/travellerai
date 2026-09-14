import type { VehicleInspectionSelect, VehicleInspectionInsert } from './vehicle-inspection.schema.js';

export type VehicleInspectionEntity = VehicleInspectionSelect;

export type NewVehicleInspection = VehicleInspectionInsert;

export type UpdateVehicleInspection = Partial<Omit<VehicleInspectionEntity, 'id'>> & {
  id: string;
};

export interface IVehicleInspectionRepository {
  findById(id: string): Promise<VehicleInspectionEntity | null>;
  findAll(params: ListVehicleInspectionParams): Promise<ListVehicleInspectionResult>;
  create(data: NewVehicleInspection): Promise<VehicleInspectionEntity>;
  update(data: UpdateVehicleInspection): Promise<VehicleInspectionEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleInspectionParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleInspectionResult {
  items: VehicleInspectionEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
