import { z } from 'zod';


export const DeletePackageInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeletePackageInput = z.infer<typeof DeletePackageInputSchema>;
