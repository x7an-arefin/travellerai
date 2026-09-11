import { z } from 'zod';

const SupportTicketBaseSchema = z.object({
  id: z.string(),
  ticketNumber: z.string(),
  subject: z.string(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).nullable(),
  status: z.enum(['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']).nullable(),
  assignedAgentId: z.string().nullable(),

});


export const ListSupportTicketOutputSchema = z.object({
  items: z.array(SupportTicketBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListSupportTicketOutput = z.infer<typeof ListSupportTicketOutputSchema>;
