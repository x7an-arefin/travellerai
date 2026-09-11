import { z } from 'zod';


export const GetPackageAddonInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetPackageAddonInput = z.infer<typeof GetPackageAddonInputSchema>;
