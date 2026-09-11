import { z } from 'zod';


export const ListPackageAddonInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  packageId: z.string().optional(),
  status: z.string().optional(),

});


export type ListPackageAddonInput = z.infer<typeof ListPackageAddonInputSchema>;
