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


export const ListPropertyAmenityOutputSchema = z.object({
  items: z.array(PropertyAmenityBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListPropertyAmenityOutput = z.infer<typeof ListPropertyAmenityOutputSchema>;
