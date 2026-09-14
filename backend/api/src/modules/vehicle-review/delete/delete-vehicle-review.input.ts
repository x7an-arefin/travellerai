import { z } from 'zod';


export const DeleteVehicleReviewInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleReviewInput = z.infer<typeof DeleteVehicleReviewInputSchema>;
