import { z } from 'zod';


export const CreateVehicleBookingExtraInputSchema = z.object({
  vehicleBookingId: z.string().uuid(),
  extraType: z.enum(['child_seat_infant', 'child_seat_toddler', 'booster_seat', 'gps_navigator', 'roof_luggage_carrier', 'wifi_hotspot', 'additional_driver', 'satellite_phone']).optional().default('child_seat_infant'),
  name: z.string().max(100),
  dailyRate: z.string().regex(/^\d+(\.\d+)?$/),
  quantity: z.number().int().optional().default(1),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleBookingExtraInput = z.infer<typeof CreateVehicleBookingExtraInputSchema>;
