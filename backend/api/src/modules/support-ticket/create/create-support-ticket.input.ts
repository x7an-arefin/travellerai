import { z } from 'zod';


export const CreateSupportTicketInputSchema = z.object({
  ticketNumber: z.string().max(20),
  userId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  bookingId: z.string().uuid().optional(),
  subject: z.string().max(300),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional().default('medium'),
  category: z.string().max(100).optional(),
  status: z.enum(['open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed']).optional().default('open'),
  assignedAgentId: z.string().uuid().optional(),
  slDeadline: z.string().datetime().optional(),
  resolvedAt: z.string().datetime().optional(),
  satisfactionRating: z.number().int().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateSupportTicketInput = z.infer<typeof CreateSupportTicketInputSchema>;
