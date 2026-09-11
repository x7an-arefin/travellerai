import { z } from 'zod';

const DestinationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteDestinationOutputSchema = DestinationBaseSchema;


export type DeleteDestinationOutput = z.infer<typeof DeleteDestinationOutputSchema>;
