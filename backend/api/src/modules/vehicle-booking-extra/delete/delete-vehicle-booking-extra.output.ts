import { z } from 'zod';

const VehicleBookingExtraBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  name: z.string(),
  dailyRate: z.string(),
  totalAmount: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleBookingExtraOutputSchema = VehicleBookingExtraBaseSchema;


export type DeleteVehicleBookingExtraOutput = z.infer<typeof DeleteVehicleBookingExtraOutputSchema>;
