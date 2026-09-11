import { z } from 'zod';

const DisputeBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  complainantId: z.string(),
  reason: z.string(),
  description: z.string().nullable(),
  evidenceUrls: z.record(z.string(), z.unknown()).nullable(),
  status: z.enum(['open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated']).nullable(),
  resolutionNotes: z.string().nullable(),
  financialAdjustment: z.string().nullable(),
  resolvedAt: z.date().nullable(),

});


export const GetDisputeOutputSchema = DisputeBaseSchema;


export type GetDisputeOutput = z.infer<typeof GetDisputeOutputSchema>;
