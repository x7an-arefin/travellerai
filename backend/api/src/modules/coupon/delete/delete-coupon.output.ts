import { z } from 'zod';

const CouponBaseSchema = z.object({
  id: z.string(),
  code: z.string(),
  discountValue: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteCouponOutputSchema = CouponBaseSchema;


export type DeleteCouponOutput = z.infer<typeof DeleteCouponOutputSchema>;
