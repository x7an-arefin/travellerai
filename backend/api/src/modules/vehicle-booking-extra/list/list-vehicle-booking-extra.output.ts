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


export const ListVehicleBookingExtraOutputSchema = z.object({
  items: z.array(VehicleBookingExtraBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListVehicleBookingExtraOutput = z.infer<typeof ListVehicleBookingExtraOutputSchema>;
