import { z } from 'zod';


export const CreateAmenityInputSchema = z.object({
  name: z.string().max(150),
  icon: z.string().max(100).optional(),
  category: z.enum(['comfort', 'safety', 'accessibility', 'connectivity', 'catering', 'transport']).optional().default('comfort'),
  status: z.enum(['active', 'inactive']).optional().default('active'),

});



export type CreateAmenityInput = z.infer<typeof CreateAmenityInputSchema>;
