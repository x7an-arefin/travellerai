import type { VehicleBookingSelect, VehicleBookingInsert } from './vehicle-booking.schema.js';

export type VehicleBookingEntity = VehicleBookingSelect;

export type NewVehicleBooking = VehicleBookingInsert;

export type UpdateVehicleBooking = Partial<Omit<VehicleBookingEntity, 'id'>> & {
  id: string;
};

export interface IVehicleBookingRepository {
  findById(id: string): Promise<VehicleBookingEntity | null>;
  findAll(params: ListVehicleBookingParams): Promise<ListVehicleBookingResult>;
  create(data: NewVehicleBooking): Promise<VehicleBookingEntity>;
  update(data: UpdateVehicleBooking): Promise<VehicleBookingEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListVehicleBookingParams {
  cursor?: string;
  limit?: number;

}

export interface ListVehicleBookingResult {
  items: VehicleBookingEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
