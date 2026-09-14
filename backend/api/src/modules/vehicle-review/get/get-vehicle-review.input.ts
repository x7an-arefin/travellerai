import { z } from 'zod';


export const GetVehicleReviewInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleReviewInput = z.infer<typeof GetVehicleReviewInputSchema>;
