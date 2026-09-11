import { z } from 'zod';


export const CreateWaitlistInputSchema = z.object({
  departureId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  travelerEmail: z.string().max(255),
  travelerName: z.string().max(200),
  requestedSeats: z.number().int(),
  status: z.enum(['waiting', 'offered', 'booked', 'expired', 'cancelled']).optional().default('waiting'),
  offerExpiresAt: z.string().datetime().optional(),
  notifiedAt: z.string().datetime().optional(),

});



export type CreateWaitlistInput = z.infer<typeof CreateWaitlistInputSchema>;
