import { z } from 'zod';

const CouponBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  discountType: z.enum(['percentage', 'fixed']).nullable(),
  discountValue: z.string(),
  expiresAt: z.date().nullable(),
  usedCount: z.number().int().nullable(),
  status: z.enum(['active', 'inactive', 'expired']).nullable(),

});


export const ListCouponOutputSchema = z.object({
  items: z.array(CouponBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListCouponOutput = z.infer<typeof ListCouponOutputSchema>;
