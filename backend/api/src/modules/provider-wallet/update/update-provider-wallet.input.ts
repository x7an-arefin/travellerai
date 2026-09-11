import { z } from 'zod';


export const UpdateProviderWalletInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  pendingBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  availableBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  reservedBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  withdrawnBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  negativeBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateProviderWalletInput = z.infer<typeof UpdateProviderWalletInputSchema>;
