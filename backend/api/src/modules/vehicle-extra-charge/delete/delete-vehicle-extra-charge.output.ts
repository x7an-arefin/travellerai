import { z } from 'zod';

const VehicleExtraChargeBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  description: z.string(),
  amount: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleExtraChargeOutputSchema = VehicleExtraChargeBaseSchema;


export type DeleteVehicleExtraChargeOutput = z.infer<typeof DeleteVehicleExtraChargeOutputSchema>;
