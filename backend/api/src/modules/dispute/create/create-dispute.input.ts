import { z } from 'zod';


export const CreateDisputeInputSchema = z.object({
  bookingId: z.string().uuid(),
  complainantId: z.string().uuid(),
  reason: z.string().max(300),
  description: z.string().optional(),
  evidenceUrls: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated']).optional().default('open'),
  resolutionNotes: z.string().optional(),
  financialAdjustment: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  assignedAgentId: z.string().uuid().optional(),
  resolvedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateDisputeInput = z.infer<typeof CreateDisputeInputSchema>;
