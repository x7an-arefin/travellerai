import { z } from 'zod';


export const CreateTicketMessageInputSchema = z.object({
  ticketId: z.string().uuid(),
  senderId: z.string().uuid(),
  senderType: z.enum(['traveler', 'provider', 'agent', 'system']).optional().default('traveler'),
  message: z.string(),
  attachments: z.record(z.string(), z.unknown()).optional(),
  isInternalNote: z.boolean().optional().default(false),
  readAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateTicketMessageInput = z.infer<typeof CreateTicketMessageInputSchema>;
