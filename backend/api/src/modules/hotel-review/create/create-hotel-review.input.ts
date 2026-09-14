import { z } from 'zod';


export const CreateHotelReviewInputSchema = z.object({
  hotelBookingId: z.string().uuid(),
  propertyId: z.string().uuid(),
  travelerId: z.string().uuid().optional(),
  overallRating: z.number().int().default(5),
  cleanlinessRating: z.number().int().optional().default(5),
  locationRating: z.number().int().optional().default(5),
  serviceRating: z.number().int().optional().default(5),
  facilitiesRating: z.number().int().optional().default(5),
  valueRating: z.number().int().optional().default(5),
  reviewTitle: z.string().max(200).optional(),
  reviewText: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  isVerifiedStay: z.boolean().optional().default(true),
  providerResponseText: z.string().optional(),
  providerRespondedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelReviewInput = z.infer<typeof CreateHotelReviewInputSchema>;
