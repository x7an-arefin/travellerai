import { z } from 'zod';


export const UpdateCouponInputSchema = z.object({
  code: z.string().max(50).optional(),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  minBookingValue: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  maxDiscount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  providerId: z.string().uuid().optional(),
  startsAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  maxUses: z.number().int().optional(),
  usedCount: z.number().int().optional(),
  maxUsesPerCustomer: z.number().int().optional(),
  isFirstBookingOnly: z.boolean().optional(),
  funder: z.enum(['marketplace', 'provider', 'shared']).optional(),
  status: z.enum(['active', 'inactive', 'expired']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateCouponInput = z.infer<typeof UpdateCouponInputSchema>;
