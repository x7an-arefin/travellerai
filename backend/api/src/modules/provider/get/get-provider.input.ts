import { z } from 'zod';


export const GetProviderInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetProviderInput = z.infer<typeof GetProviderInputSchema>;
