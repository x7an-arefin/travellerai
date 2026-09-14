import { z } from 'zod';


export const UpdatePropertyAmenityInputSchema = z.object({
  propertyId: z.string().uuid().optional(),
  category: z.enum(['general', 'room', 'wellness_spa', 'dining', 'business', 'accessibility', 'family_kids', 'outdoor_sports']).optional(),
  amenityCode: z.string().max(50).optional(),
  name: z.string().max(100).optional(),
  isFree: z.boolean().optional(),
  chargeAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  chargeFrequency: z.enum(['one_time', 'per_night', 'per_stay', 'per_hour']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdatePropertyAmenityInput = z.infer<typeof UpdatePropertyAmenityInputSchema>;
