import { z } from 'zod';


export const UpdateGiftCardInputSchema = z.object({
  code: z.string().max(50).optional(),
  initialBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currentBalance: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  purchaserId: z.string().uuid().optional(),
  recipientEmail: z.string().max(255).optional(),
  recipientName: z.string().max(200).optional(),
  personalMessage: z.string().optional(),
  deliveryDate: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  status: z.enum(['active', 'redeemed', 'expired', 'cancelled']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateGiftCardInput = z.infer<typeof UpdateGiftCardInputSchema>;
