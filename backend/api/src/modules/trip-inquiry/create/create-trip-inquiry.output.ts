import { z } from 'zod';

const TripInquiryBaseSchema = z.object({
  id: z.string(),
  contactEmail: z.string(),
  contactName: z.string(),
  status: z.enum(['open', 'quoted', 'accepted', 'booked', 'expired', 'closed']).nullable(),

});


export const CreateTripInquiryOutputSchema = TripInquiryBaseSchema;


export type CreateTripInquiryOutput = z.infer<typeof CreateTripInquiryOutputSchema>;
