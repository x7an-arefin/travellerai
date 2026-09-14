import { z } from 'zod';


export const UpdateVehicleBookingExtraInputSchema = z.object({
  vehicleBookingId: z.string().uuid().optional(),
  extraType: z.enum(['child_seat_infant', 'child_seat_toddler', 'booster_seat', 'gps_navigator', 'roof_luggage_carrier', 'wifi_hotspot', 'additional_driver', 'satellite_phone']).optional(),
  name: z.string().max(100).optional(),
  dailyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  quantity: z.number().int().optional(),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleBookingExtraInput = z.infer<typeof UpdateVehicleBookingExtraInputSchema>;
