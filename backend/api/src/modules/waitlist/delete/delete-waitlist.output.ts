import { z } from 'zod';

const WaitlistBaseSchema = z.object({
  id: z.string(),
  departureId: z.string(),
  travelerEmail: z.string(),
  travelerName: z.string(),
  requestedSeats: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteWaitlistOutputSchema = WaitlistBaseSchema;


export type DeleteWaitlistOutput = z.infer<typeof DeleteWaitlistOutputSchema>;
