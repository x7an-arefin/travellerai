import { z } from 'zod';


export const UpdateAmenityInputSchema = z.object({
  name: z.string().max(150).optional(),
  icon: z.string().max(100).optional(),
  category: z.enum(['comfort', 'safety', 'accessibility', 'connectivity', 'catering', 'transport']).optional(),
  status: z.enum(['active', 'inactive']).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateAmenityInput = z.infer<typeof UpdateAmenityInputSchema>;
