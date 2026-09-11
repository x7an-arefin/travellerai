import { z } from 'zod';

const DisputeBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  reason: z.string(),
  status: z.enum(['open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated']).nullable(),

});


export const ListDisputeOutputSchema = z.object({
  items: z.array(DisputeBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListDisputeOutput = z.infer<typeof ListDisputeOutputSchema>;
