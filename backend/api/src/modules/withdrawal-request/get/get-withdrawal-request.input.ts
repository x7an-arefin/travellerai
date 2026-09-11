import { z } from 'zod';


export const GetWithdrawalRequestInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetWithdrawalRequestInput = z.infer<typeof GetWithdrawalRequestInputSchema>;
