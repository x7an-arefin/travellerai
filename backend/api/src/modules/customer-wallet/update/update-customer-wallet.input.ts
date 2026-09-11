import { z } from 'zod';


export const UpdateCustomerWalletInputSchema = z.object({
  userId: z.string().uuid().optional(),
  availableBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  status: z.enum(['active', 'frozen']).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateCustomerWalletInput = z.infer<typeof UpdateCustomerWalletInputSchema>;
