import type { VehicleComplianceDocSelect, VehicleComplianceDocInsert } from './vehicle-compliance-doc.schema.js';

export type VehicleComplianceDocEntity = VehicleComplianceDocSelect;

export type NewVehicleComplianceDoc = VehicleComplianceDocInsert;

export type UpdateVehicleComplianceDoc = Partial<Omit<VehicleComplianceDocEntity, 'id'>> & {
  id: string;
};

export interface IVehicleComplianceDocRepository {
  findById(id: string): Promise<VehicleComplianceDocEntity | null>;
  findAll(params: ListVehicleComplianceDocParams): Promise<ListVehicleComplianceDocResult>;
  create(data: NewVehicleComplianceDoc): Promise<VehicleComplianceDocEntity>;
  update(data: UpdateVehicleComplianceDoc): Promise<VehicleComplianceDocEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleComplianceDocParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleComplianceDocResult {
  items: VehicleComplianceDocEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
