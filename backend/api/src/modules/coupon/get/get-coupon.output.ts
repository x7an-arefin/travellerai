import { z } from 'zod';

const CouponBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  discountType: z.enum(['percentage', 'fixed']).nullable(),
  discountValue: z.string(),
  currency: z.string().nullable(),
  minBookingValue: z.string().nullable(),
  maxDiscount: z.string().nullable(),
  startsAt: z.date().nullable(),
  expiresAt: z.date().nullable(),
  usedCount: z.number().int().nullable(),
  status: z.enum(['active', 'inactive', 'expired']).nullable(),

});


export const GetCouponOutputSchema = CouponBaseSchema;


export type GetCouponOutput = z.infer<typeof GetCouponOutputSchema>;
