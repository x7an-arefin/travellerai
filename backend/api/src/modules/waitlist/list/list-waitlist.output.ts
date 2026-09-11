import { z } from 'zod';

const WaitlistBaseSchema = z.object({
  id: z.string(),
  travelerEmail: z.string(),
  travelerName: z.string(),
  requestedSeats: z.number().int(),
  status: z.enum(['waiting', 'offered', 'booked', 'expired', 'cancelled']).nullable(),

});


export const ListWaitlistOutputSchema = z.object({
  items: z.array(WaitlistBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListWaitlistOutput = z.infer<typeof ListWaitlistOutputSchema>;
