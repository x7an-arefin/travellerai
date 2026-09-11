import { z } from 'zod';


export const CreateProviderWalletInputSchema = z.object({
  providerId: z.string().uuid(),
  pendingBalance: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  availableBalance: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  reservedBalance: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  withdrawnBalance: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  negativeBalance: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0'),
  currency: z.string().max(3),

});



export type CreateProviderWalletInput = z.infer<typeof CreateProviderWalletInputSchema>;
