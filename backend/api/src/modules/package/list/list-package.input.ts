import { z } from 'zod';


export const ListPackageInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  providerId: z.string().optional(),
  categoryId: z.string().optional(),
  destinationId: z.string().optional(),
  productType: z.string().optional(),
  status: z.string().optional(),
  isFeatured: z.string().optional(),
  difficultyLevel: z.string().optional(),
  confirmationType: z.string().optional(),

});


export type ListPackageInput = z.infer<typeof ListPackageInputSchema>;
