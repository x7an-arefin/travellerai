import { z } from 'zod';

const DisputeBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  complainantId: z.string(),
  reason: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteDisputeOutputSchema = DisputeBaseSchema;


export type DeleteDisputeOutput = z.infer<typeof DeleteDisputeOutputSchema>;
