import { z } from 'zod';


export const ListCategoryInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  parentId: z.string().optional(),
  status: z.string().optional(),

});


export type ListCategoryInput = z.infer<typeof ListCategoryInputSchema>;
