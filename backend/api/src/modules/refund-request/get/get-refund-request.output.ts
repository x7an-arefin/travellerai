import { z } from 'zod';

const RefundRequestBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  initiatedBy: z.enum(['traveler', 'provider', 'admin', 'system']).nullable(),
  reason: z.string(),
  requestedAmount: z.string(),
  approvedAmount: z.string().nullable(),
  cancellationFee: z.string().nullable(),
  refundMethod: z.enum(['original_payment', 'wallet', 'bank_transfer', 'mixed']).nullable(),
  status: z.enum(['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']).nullable(),
  reviewNotes: z.string().nullable(),
  processedAt: z.date().nullable(),

});


export const GetRefundRequestOutputSchema = RefundRequestBaseSchema;


export type GetRefundRequestOutput = z.infer<typeof GetRefundRequestOutputSchema>;
