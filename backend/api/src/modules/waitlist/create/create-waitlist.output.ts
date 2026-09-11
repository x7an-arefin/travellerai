import { z } from 'zod';

const WaitlistBaseSchema = z.object({
  id: z.string(),
  departureId: z.string(),
  travelerEmail: z.string(),
  requestedSeats: z.number().int(),
  status: z.enum(['waiting', 'offered', 'booked', 'expired', 'cancelled']).nullable(),

});


export const CreateWaitlistOutputSchema = WaitlistBaseSchema;


export type CreateWaitlistOutput = z.infer<typeof CreateWaitlistOutputSchema>;
