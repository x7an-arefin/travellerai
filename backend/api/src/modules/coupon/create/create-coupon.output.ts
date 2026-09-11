import { z } from 'zod';

const CouponBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  discountType: z.enum(['percentage', 'fixed']).nullable(),
  discountValue: z.string(),
  status: z.enum(['active', 'inactive', 'expired']).nullable(),

});


export const CreateCouponOutputSchema = CouponBaseSchema;


export type CreateCouponOutput = z.infer<typeof CreateCouponOutputSchema>;
