import { z } from 'zod';

const TripInquiryBaseSchema = z.object({
  id: z.string(),
  status: z.enum(['open', 'quoted', 'accepted', 'booked', 'expired', 'closed']).nullable(),

});


export const UpdateTripInquiryOutputSchema = TripInquiryBaseSchema;


export type UpdateTripInquiryOutput = z.infer<typeof UpdateTripInquiryOutputSchema>;
