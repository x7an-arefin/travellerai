import { z } from 'zod';


export const UpdatePackageFaqInputSchema = z.object({
  packageId: z.string().uuid().optional(),
  question: z.string().max(500).optional(),
  answer: z.string().optional(),
  sortOrder: z.number().int().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdatePackageFaqInput = z.infer<typeof UpdatePackageFaqInputSchema>;
