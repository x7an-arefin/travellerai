import { z } from 'zod';


export const UpdateHotelReviewInputSchema = z.object({
  hotelBookingId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  travelerId: z.string().uuid().optional(),
  overallRating: z.number().int().optional(),
  cleanlinessRating: z.number().int().optional(),
  locationRating: z.number().int().optional(),
  serviceRating: z.number().int().optional(),
  facilitiesRating: z.number().int().optional(),
  valueRating: z.number().int().optional(),
  reviewTitle: z.string().max(200).optional(),
  reviewText: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  isVerifiedStay: z.boolean().optional(),
  providerResponseText: z.string().optional(),
  providerRespondedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelReviewInput = z.infer<typeof UpdateHotelReviewInputSchema>;
