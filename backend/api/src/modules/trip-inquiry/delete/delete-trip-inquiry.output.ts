import { z } from 'zod';

const TripInquiryBaseSchema = z.object({
  id: z.string(),
  contactEmail: z.string(),
  contactName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteTripInquiryOutputSchema = TripInquiryBaseSchema;


export type DeleteTripInquiryOutput = z.infer<typeof DeleteTripInquiryOutputSchema>;
