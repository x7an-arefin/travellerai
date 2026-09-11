import { z } from 'zod';

const DestinationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  status: z.enum(['active', 'inactive', 'draft']).nullable(),

});


export const CreateDestinationOutputSchema = DestinationBaseSchema;


export type CreateDestinationOutput = z.infer<typeof CreateDestinationOutputSchema>;
