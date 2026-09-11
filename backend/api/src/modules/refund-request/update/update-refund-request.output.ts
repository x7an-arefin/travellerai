import { z } from 'zod';

const RefundRequestBaseSchema = z.object({
  id: z.string(),
  approvedAmount: z.string().nullable(),
  status: z.enum(['pending', 'approved', 'rejected', 'processing', 'processed', 'failed']).nullable(),
  reviewNotes: z.string().nullable(),
  processedAt: z.date().nullable(),

});


export const UpdateRefundRequestOutputSchema = RefundRequestBaseSchema;


export type UpdateRefundRequestOutput = z.infer<typeof UpdateRefundRequestOutputSchema>;
