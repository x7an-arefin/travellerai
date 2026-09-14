import { z } from 'zod';

const VehicleBookingExtraBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  extraType: z.enum(['child_seat_infant', 'child_seat_toddler', 'booster_seat', 'gps_navigator', 'roof_luggage_carrier', 'wifi_hotspot', 'additional_driver', 'satellite_phone']).nullable(),
  name: z.string(),
  dailyRate: z.string(),
  quantity: z.number().int().nullable(),
  totalAmount: z.string(),

});


export const GetVehicleBookingExtraOutputSchema = VehicleBookingExtraBaseSchema;


export type GetVehicleBookingExtraOutput = z.infer<typeof GetVehicleBookingExtraOutputSchema>;
