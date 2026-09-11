import { z } from 'zod';

const DestinationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  status: z.enum(['active', 'inactive', 'draft']).nullable(),

});


export const UpdateDestinationOutputSchema = DestinationBaseSchema;


export type UpdateDestinationOutput = z.infer<typeof UpdateDestinationOutputSchema>;
