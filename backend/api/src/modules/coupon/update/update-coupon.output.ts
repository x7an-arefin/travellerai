import { z } from 'zod';

const CouponBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  expiresAt: z.date().nullable(),
  maxUses: z.number().int().nullable(),
  status: z.enum(['active', 'inactive', 'expired']).nullable(),

});


export const UpdateCouponOutputSchema = CouponBaseSchema;


export type UpdateCouponOutput = z.infer<typeof UpdateCouponOutputSchema>;
