import { z } from 'zod';

const VehicleBookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  providerId: z.string(),
  vehicleId: z.string().nullable(),
  rentalModel: z.enum(['self_drive', 'with_driver']).nullable(),
  serviceType: z.enum(['self_drive_rental', 'airport_transfer_arrival', 'airport_transfer_departure', 'intercity_transfer', 'hourly_city_charter', 'full_day_tour', 'multi_day_outstation']).nullable(),
  bookingStatus: z.enum(['pending_payment', 'confirmed', 'assigned', 'en_route_to_pickup', 'arrived_at_pickup', 'in_progress', 'returned', 'completed', 'cancelled']).nullable(),
  totalAmount: z.string(),
  paymentStatus: z.enum(['pending', 'authorized', 'paid', 'refunded']).nullable(),

});


export const UpdateVehicleBookingOutputSchema = VehicleBookingBaseSchema;


export type UpdateVehicleBookingOutput = z.infer<typeof UpdateVehicleBookingOutputSchema>;
