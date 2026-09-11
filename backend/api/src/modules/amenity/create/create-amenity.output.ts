import { z } from 'zod';

const AmenityBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  category: z.enum(['comfort', 'safety', 'accessibility', 'connectivity', 'catering', 'transport']).nullable(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const CreateAmenityOutputSchema = AmenityBaseSchema;


export type CreateAmenityOutput = z.infer<typeof CreateAmenityOutputSchema>;
