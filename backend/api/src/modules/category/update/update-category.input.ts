import { z } from 'zod';


export const UpdateCategoryInputSchema = z.object({
  name: z.string().max(150).optional(),
  slug: z.string().max(200).optional(),
  parentId: z.string().uuid().optional(),
  icon: z.string().max(100).optional(),
  coverImage: z.string().max(500).optional(),
  description: z.string().optional(),
  sortOrder: z.number().int().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateCategoryInput = z.infer<typeof UpdateCategoryInputSchema>;
