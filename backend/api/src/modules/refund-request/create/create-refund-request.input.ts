import { z } from 'zod';


export const CreateRefundRequestInputSchema = z.object({
  bookingId: z.string().uuid(),
  initiatedBy: z.enum(['traveler', 'provider', 'admin', 'system']).optional().default('traveler'),
  reason: z.string().max(500),
  description: z.string().optional(),
  requestedAmount: z.string().regex(/^\d+(\.\d+)?$/),
  approvedAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  cancellationFee: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  refundMethod: z.enum(['original_payment', 'wallet', 'bank_transfer', 'mixed']).optional().default('original_payment'),
  status: z.enum(['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']).optional().default('pending'),
  reviewNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  processedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateRefundRequestInput = z.infer<typeof CreateRefundRequestInputSchema>;
