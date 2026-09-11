import { z } from 'zod';


export const GetPaymentTransactionInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetPaymentTransactionInput = z.infer<typeof GetPaymentTransactionInputSchema>;
