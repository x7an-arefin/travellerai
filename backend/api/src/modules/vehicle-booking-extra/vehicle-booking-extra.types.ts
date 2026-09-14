import type { VehicleBookingExtraSelect, VehicleBookingExtraInsert } from './vehicle-booking-extra.schema.js';

export type VehicleBookingExtraEntity = VehicleBookingExtraSelect;

export type NewVehicleBookingExtra = VehicleBookingExtraInsert;

export type UpdateVehicleBookingExtra = Partial<Omit<VehicleBookingExtraEntity, 'id'>> & {
  id: string;
};

export interface IVehicleBookingExtraRepository {
  findById(id: string): Promise<VehicleBookingExtraEntity | null>;
  findAll(params: ListVehicleBookingExtraParams): Promise<ListVehicleBookingExtraResult>;
  create(data: NewVehicleBookingExtra): Promise<VehicleBookingExtraEntity>;
  update(data: UpdateVehicleBookingExtra): Promise<VehicleBookingExtraEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleBookingExtraParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleBookingExtraResult {
  items: VehicleBookingExtraEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
