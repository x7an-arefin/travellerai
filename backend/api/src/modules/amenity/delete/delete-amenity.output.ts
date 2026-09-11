import { z } from 'zod';

const AmenityBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteAmenityOutputSchema = AmenityBaseSchema;


export type DeleteAmenityOutput = z.infer<typeof DeleteAmenityOutputSchema>;
