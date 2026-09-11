import { z } from 'zod';


export const DeleteTripInquiryInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteTripInquiryInput = z.infer<typeof DeleteTripInquiryInputSchema>;
