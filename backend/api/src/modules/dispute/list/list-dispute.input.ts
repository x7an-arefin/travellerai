import { z } from 'zod';


export const ListDisputeInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  bookingId: z.string().optional(),
  status: z.string().optional(),
  assignedAgentId: z.string().optional(),

});


export type ListDisputeInput = z.infer<typeof ListDisputeInputSchema>;
