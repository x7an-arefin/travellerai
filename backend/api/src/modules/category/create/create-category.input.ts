import { z } from 'zod';


export const CreateCategoryInputSchema = z.object({
  name: z.string().max(150),
  slug: z.string().max(200),
  parentId: z.string().uuid().optional(),
  icon: z.string().max(100).optional(),
  coverImage: z.string().max(500).optional(),
  description: z.string().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(['active', 'inactive']).optional().default('active'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateCategoryInput = z.infer<typeof CreateCategoryInputSchema>;
