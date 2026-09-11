import { z } from 'zod';


export const UpdateRefundRequestInputSchema = z.object({
  bookingId: z.string().uuid().optional(),
  initiatedBy: z.enum(['traveler', 'provider', 'admin', 'system']).optional(),
  reason: z.string().max(500).optional(),
  description: z.string().optional(),
  requestedAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  approvedAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  cancellationFee: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  refundMethod: z.enum(['original_payment', 'wallet', 'bank_transfer', 'mixed']).optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']).optional(),
  reviewNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  processedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateRefundRequestInput = z.infer<typeof UpdateRefundRequestInputSchema>;
