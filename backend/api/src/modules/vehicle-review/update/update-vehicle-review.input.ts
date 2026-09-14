import { z } from 'zod';


export const UpdateVehicleReviewInputSchema = z.object({
  vehicleBookingId: z.string().uuid().optional(),
  vehicleId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  travelerId: z.string().uuid().optional(),
  overallRating: z.number().int().optional(),
  vehicleConditionRating: z.number().int().optional(),
  driverProfessionalismRating: z.number().int().optional(),
  punctualityRating: z.number().int().optional(),
  valueRating: z.number().int().optional(),
  reviewText: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  isVerifiedRental: z.boolean().optional(),
  providerResponseText: z.string().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleReviewInput = z.infer<typeof UpdateVehicleReviewInputSchema>;
