import { z } from 'zod';

const WaitlistBaseSchema = z.object({
  id: z.string(),
  departureId: z.string(),
  userId: z.string().nullable(),
  travelerEmail: z.string(),
  travelerName: z.string(),
  requestedSeats: z.number().int(),
  status: z.enum(['waiting', 'offered', 'booked', 'expired', 'cancelled']).nullable(),
  offerExpiresAt: z.date().nullable(),

});


export const GetWaitlistOutputSchema = WaitlistBaseSchema;


export type GetWaitlistOutput = z.infer<typeof GetWaitlistOutputSchema>;
