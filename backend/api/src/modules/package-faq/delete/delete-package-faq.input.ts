import { z } from 'zod';


export const DeletePackageFaqInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeletePackageFaqInput = z.infer<typeof DeletePackageFaqInputSchema>;
