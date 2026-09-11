import { z } from 'zod';

const RefundRequestBaseSchema = z.object({
  id: z.string(),
  initiatedBy: z.enum(['traveler', 'provider', 'admin', 'system']).nullable(),
  requestedAmount: z.string(),
  approvedAmount: z.string().nullable(),
  refundMethod: z.enum(['original_payment', 'wallet', 'bank_transfer', 'mixed']).nullable(),
  status: z.enum(['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']).nullable(),

});


export const ListRefundRequestOutputSchema = z.object({
  items: z.array(RefundRequestBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListRefundRequestOutput = z.infer<typeof ListRefundRequestOutputSchema>;
