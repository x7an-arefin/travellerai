import { z } from 'zod';


export const DeletePackageAddonInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeletePackageAddonInput = z.infer<typeof DeletePackageAddonInputSchema>;
