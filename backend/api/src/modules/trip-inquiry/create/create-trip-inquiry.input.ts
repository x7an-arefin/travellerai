import { z } from 'zod';


export const CreateTripInquiryInputSchema = z.object({
  travelerId: z.string().uuid().optional(),
  destinationId: z.string().uuid().optional(),
  contactEmail: z.string().max(255),
  contactName: z.string().max(200),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  travelerCount: z.number().int().optional(),
  estimatedBudget: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  budgetCurrency: z.string().max(3).optional(),
  preferences: z.record(z.string(), z.unknown()).optional(),
  specialRequests: z.string().optional(),
  status: z.enum(['open', 'quoted', 'accepted', 'booked', 'expired', 'closed']).optional().default('open'),
  expiresAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateTripInquiryInput = z.infer<typeof CreateTripInquiryInputSchema>;
