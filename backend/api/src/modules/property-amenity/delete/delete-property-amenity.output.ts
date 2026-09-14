import { z } from 'zod';

const PropertyAmenityBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  amenityCode: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeletePropertyAmenityOutputSchema = PropertyAmenityBaseSchema;


export type DeletePropertyAmenityOutput = z.infer<typeof DeletePropertyAmenityOutputSchema>;
