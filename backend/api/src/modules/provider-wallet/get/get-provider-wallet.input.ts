import { z } from 'zod';


export const GetProviderWalletInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetProviderWalletInput = z.infer<typeof GetProviderWalletInputSchema>;
