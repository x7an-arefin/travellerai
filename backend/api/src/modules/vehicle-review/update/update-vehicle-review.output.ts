import { z } from 'zod';

const VehicleReviewBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  vehicleId: z.string().nullable(),
  driverId: z.string().nullable(),
  overallRating: z.number().int(),
  isVerifiedRental: z.boolean().nullable(),
  createdAt: z.date(),

});


export const UpdateVehicleReviewOutputSchema = VehicleReviewBaseSchema;


export type UpdateVehicleReviewOutput = z.infer<typeof UpdateVehicleReviewOutputSchema>;
