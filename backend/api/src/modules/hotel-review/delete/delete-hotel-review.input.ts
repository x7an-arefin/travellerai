import { z } from 'zod';


export const DeleteHotelReviewInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteHotelReviewInput = z.infer<typeof DeleteHotelReviewInputSchema>;
