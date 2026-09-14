import type { VehicleMaintenanceLogSelect, VehicleMaintenanceLogInsert } from './vehicle-maintenance-log.schema.js';

export type VehicleMaintenanceLogEntity = VehicleMaintenanceLogSelect;

export type NewVehicleMaintenanceLog = VehicleMaintenanceLogInsert;

export type UpdateVehicleMaintenanceLog = Partial<Omit<VehicleMaintenanceLogEntity, 'id'>> & {
  id: string;
};

export interface IVehicleMaintenanceLogRepository {
  findById(id: string): Promise<VehicleMaintenanceLogEntity | null>;
  findAll(params: ListVehicleMaintenanceLogParams): Promise<ListVehicleMaintenanceLogResult>;
  create(data: NewVehicleMaintenanceLog): Promise<VehicleMaintenanceLogEntity>;
  update(data: UpdateVehicleMaintenanceLog): Promise<VehicleMaintenanceLogEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleMaintenanceLogParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleMaintenanceLogResult {
  items: VehicleMaintenanceLogEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
