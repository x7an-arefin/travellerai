import { z } from 'zod';


export const GetHotelReviewInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetHotelReviewInput = z.infer<typeof GetHotelReviewInputSchema>;
