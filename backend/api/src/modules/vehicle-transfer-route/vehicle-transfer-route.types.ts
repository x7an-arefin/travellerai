import type { VehicleTransferRouteSelect, VehicleTransferRouteInsert } from './vehicle-transfer-route.schema.js';

export type VehicleTransferRouteEntity = VehicleTransferRouteSelect;

export type NewVehicleTransferRoute = VehicleTransferRouteInsert;

export type UpdateVehicleTransferRoute = Partial<Omit<VehicleTransferRouteEntity, 'id'>> & {
  id: string;
};

export interface IVehicleTransferRouteRepository {
  findById(id: string): Promise<VehicleTransferRouteEntity | null>;
  findAll(params: ListVehicleTransferRouteParams): Promise<ListVehicleTransferRouteResult>;
  create(data: NewVehicleTransferRoute): Promise<VehicleTransferRouteEntity>;
  update(data: UpdateVehicleTransferRoute): Promise<VehicleTransferRouteEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleTransferRouteParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleTransferRouteResult {
  items: VehicleTransferRouteEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
