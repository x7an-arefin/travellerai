import { z } from 'zod';


export const ListPackageFaqInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  packageId: z.string().optional(),

});


export type ListPackageFaqInput = z.infer<typeof ListPackageFaqInputSchema>;
