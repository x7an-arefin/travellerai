import { z } from 'zod';


export const CreateCouponInputSchema = z.object({
  code: z.string().max(50),
  discountType: z.enum(['percentage', 'fixed']).optional().default('percentage'),
  discountValue: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3).optional(),
  minBookingValue: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  maxDiscount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  providerId: z.string().uuid().optional(),
  startsAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  maxUses: z.number().int().optional(),
  usedCount: z.number().int().optional().default(0),
  maxUsesPerCustomer: z.number().int().optional(),
  isFirstBookingOnly: z.boolean().optional().default(false),
  funder: z.enum(['marketplace', 'provider', 'shared']).optional().default('marketplace'),
  status: z.enum(['active', 'inactive', 'expired']).optional().default('active'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateCouponInput = z.infer<typeof CreateCouponInputSchema>;
