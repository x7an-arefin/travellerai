import { z } from 'zod';


export const DeleteProviderPayoutAccountInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteProviderPayoutAccountInput = z.infer<typeof DeleteProviderPayoutAccountInputSchema>;
