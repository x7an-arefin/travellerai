import { z } from 'zod';

const TripInquiryBaseSchema = z.object({
  id: z.string(),
  travelerId: z.string().nullable(),
  destinationId: z.string().nullable(),
  contactEmail: z.string(),
  contactName: z.string(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  travelerCount: z.number().int().nullable(),
  estimatedBudget: z.string().nullable(),
  budgetCurrency: z.string().nullable(),
  preferences: z.record(z.string(), z.unknown()).nullable(),
  specialRequests: z.string().nullable(),
  status: z.enum(['open', 'quoted', 'accepted', 'booked', 'expired', 'closed']).nullable(),
  expiresAt: z.date().nullable(),

});


export const GetTripInquiryOutputSchema = TripInquiryBaseSchema;


export type GetTripInquiryOutput = z.infer<typeof GetTripInquiryOutputSchema>;
