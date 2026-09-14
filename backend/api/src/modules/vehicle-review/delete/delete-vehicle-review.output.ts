import { z } from 'zod';

const VehicleReviewBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  overallRating: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleReviewOutputSchema = VehicleReviewBaseSchema;


export type DeleteVehicleReviewOutput = z.infer<typeof DeleteVehicleReviewOutputSchema>;
