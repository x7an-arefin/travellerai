import { z } from 'zod';


export const CreateVehicleReviewInputSchema = z.object({
  vehicleBookingId: z.string().uuid(),
  vehicleId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  travelerId: z.string().uuid().optional(),
  overallRating: z.number().int().default(5),
  vehicleConditionRating: z.number().int().optional().default(5),
  driverProfessionalismRating: z.number().int().optional().default(5),
  punctualityRating: z.number().int().optional().default(5),
  valueRating: z.number().int().optional().default(5),
  reviewText: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  isVerifiedRental: z.boolean().optional().default(true),
  providerResponseText: z.string().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleReviewInput = z.infer<typeof CreateVehicleReviewInputSchema>;
