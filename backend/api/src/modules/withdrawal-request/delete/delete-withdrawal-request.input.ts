import { z } from 'zod';


export const DeleteWithdrawalRequestInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteWithdrawalRequestInput = z.infer<typeof DeleteWithdrawalRequestInputSchema>;
