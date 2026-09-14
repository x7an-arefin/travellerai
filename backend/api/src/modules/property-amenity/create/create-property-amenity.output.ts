import { z } from 'zod';

const PropertyAmenityBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  category: z.enum(['general', 'room', 'wellness_spa', 'dining', 'business', 'accessibility', 'family_kids', 'outdoor_sports']).nullable(),
  amenityCode: z.string(),
  name: z.string(),
  isFree: z.boolean().nullable(),
  chargeAmount: z.string().nullable(),

});


export const CreatePropertyAmenityOutputSchema = PropertyAmenityBaseSchema;


export type CreatePropertyAmenityOutput = z.infer<typeof CreatePropertyAmenityOutputSchema>;
