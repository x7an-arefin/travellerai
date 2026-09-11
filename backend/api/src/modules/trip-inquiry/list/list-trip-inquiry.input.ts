import { z } from 'zod';


export const ListTripInquiryInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  travelerId: z.string().optional(),
  destinationId: z.string().optional(),
  status: z.string().optional(),

});


export type ListTripInquiryInput = z.infer<typeof ListTripInquiryInputSchema>;
