import { z } from 'zod';


export const GetProviderPayoutAccountInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetProviderPayoutAccountInput = z.infer<typeof GetProviderPayoutAccountInputSchema>;
