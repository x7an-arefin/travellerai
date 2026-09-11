import { z } from 'zod';

const TripInquiryBaseSchema = z.object({
  id: z.string(),
  destinationId: z.string().nullable(),
  contactName: z.string(),
  travelerCount: z.number().int().nullable(),
  status: z.enum(['open', 'quoted', 'accepted', 'booked', 'expired', 'closed']).nullable(),

});


export const ListTripInquiryOutputSchema = z.object({
  items: z.array(TripInquiryBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListTripInquiryOutput = z.infer<typeof ListTripInquiryOutputSchema>;
