import { z } from 'zod';

const RefundRequestBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  initiatedBy: z.enum(['traveler', 'provider', 'admin', 'system']).nullable(),
  reason: z.string(),
  requestedAmount: z.string(),
  refundMethod: z.enum(['original_payment', 'wallet', 'bank_transfer', 'mixed']).nullable(),
  status: z.enum(['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']).nullable(),

});


export const CreateRefundRequestOutputSchema = RefundRequestBaseSchema;


export type CreateRefundRequestOutput = z.infer<typeof CreateRefundRequestOutputSchema>;
