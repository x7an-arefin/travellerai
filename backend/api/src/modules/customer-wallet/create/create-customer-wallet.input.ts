import { z } from 'zod';


export const CreateCustomerWalletInputSchema = z.object({
  userId: z.string().uuid(),
  availableBalance: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  currency: z.string().max(3),
  status: z.enum(['active', 'frozen']).optional().default('active'),

});



export type CreateCustomerWalletInput = z.infer<typeof CreateCustomerWalletInputSchema>;
