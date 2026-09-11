import { z } from 'zod';


export const DeleteProviderInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteProviderInput = z.infer<typeof DeleteProviderInputSchema>;
