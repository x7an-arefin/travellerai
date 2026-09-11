import { z } from 'zod';

const SupportTicketBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']).nullable(),
  assignedAgentId: z.string().nullable(),
  resolvedAt: z.date().nullable(),
  satisfactionRating: z.number().int().nullable(),

});


export const UpdateSupportTicketOutputSchema = SupportTicketBaseSchema;


export type UpdateSupportTicketOutput = z.infer<typeof UpdateSupportTicketOutputSchema>;
