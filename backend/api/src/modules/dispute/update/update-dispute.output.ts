import { z } from 'zod';

const DisputeBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated']).nullable(),
  resolutionNotes: z.string().nullable(),
  assignedAgentId: z.string().nullable(),
  resolvedAt: z.date().nullable(),

});


export const UpdateDisputeOutputSchema = DisputeBaseSchema;


export type UpdateDisputeOutput = z.infer<typeof UpdateDisputeOutputSchema>;
