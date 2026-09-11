import { z } from 'zod';


export const UpdateDisputeInputSchema = z.object({
  bookingId: z.string().uuid().optional(),
  complainantId: z.string().uuid().optional(),
  reason: z.string().max(300).optional(),
  description: z.string().optional(),
  evidenceUrls: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated']).optional(),
  resolutionNotes: z.string().optional(),
  financialAdjustment: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  assignedAgentId: z.string().uuid().optional(),
  resolvedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateDisputeInput = z.infer<typeof UpdateDisputeInputSchema>;
