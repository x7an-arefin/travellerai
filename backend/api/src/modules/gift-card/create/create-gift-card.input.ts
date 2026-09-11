import { z } from 'zod';


export const CreateGiftCardInputSchema = z.object({
  code: z.string().max(50),
  initialBalance: z.string().regex(/^\d+(\.\d+)?$/),
  currentBalance: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),
  purchaserId: z.string().uuid().optional(),
  recipientEmail: z.string().max(255).optional(),
  recipientName: z.string().max(200).optional(),
  personalMessage: z.string().optional(),
  deliveryDate: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  status: z.enum(['active', 'redeemed', 'expired', 'cancelled']).optional().default('active'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateGiftCardInput = z.infer<typeof CreateGiftCardInputSchema>;
