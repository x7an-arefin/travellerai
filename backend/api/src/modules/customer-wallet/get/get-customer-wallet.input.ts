import { z } from 'zod';


export const GetCustomerWalletInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetCustomerWalletInput = z.infer<typeof GetCustomerWalletInputSchema>;
