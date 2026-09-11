import { z } from 'zod';

const RefundRequestBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  reason: z.string(),
  requestedAmount: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteRefundRequestOutputSchema = RefundRequestBaseSchema;


export type DeleteRefundRequestOutput = z.infer<typeof DeleteRefundRequestOutputSchema>;
