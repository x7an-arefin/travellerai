import { z } from 'zod';


export const DeletePaymentTransactionInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeletePaymentTransactionInput = z.infer<typeof DeletePaymentTransactionInputSchema>;
