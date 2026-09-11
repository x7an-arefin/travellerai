import { z } from 'zod';

const WaitlistBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['waiting', 'offered', 'booked', 'expired', 'cancelled']).nullable(),
  offerExpiresAt: z.date().nullable(),

});


export const UpdateWaitlistOutputSchema = WaitlistBaseSchema;


export type UpdateWaitlistOutput = z.infer<typeof UpdateWaitlistOutputSchema>;
