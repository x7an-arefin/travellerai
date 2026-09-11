import { z } from 'zod';


export const GetTripInquiryInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetTripInquiryInput = z.infer<typeof GetTripInquiryInputSchema>;
