import { z } from 'zod';


export const CreatePackageFaqInputSchema = z.object({
  packageId: z.string().uuid(),
  question: z.string().max(500),
  answer: z.string(),
  sortOrder: z.number().int().optional(),

});



export type CreatePackageFaqInput = z.infer<typeof CreatePackageFaqInputSchema>;
