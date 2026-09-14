import { z } from 'zod';


export const CreatePropertyAmenityInputSchema = z.object({
  propertyId: z.string().uuid(),
  category: z.enum(['general', 'room', 'wellness_spa', 'dining', 'business', 'accessibility', 'family_kids', 'outdoor_sports']).optional().default('general'),
  amenityCode: z.string().max(50),
  name: z.string().max(100),
  isFree: z.boolean().optional().default(true),
  chargeAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  chargeFrequency: z.enum(['one_time', 'per_night', 'per_stay', 'per_hour']).optional().default('per_stay'),
  deletedAt: z.string().datetime().optional(),

});



export type CreatePropertyAmenityInput = z.infer<typeof CreatePropertyAmenityInputSchema>;
