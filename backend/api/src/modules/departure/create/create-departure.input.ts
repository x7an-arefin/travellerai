import { z } from 'zod';


export const CreateDepartureInputSchema = z.object({
  packageId: z.string().uuid(),
  departureCode: z.string().max(50),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime().optional(),
  capacity: z.number().int(),
  bookedCount: z.number().int().optional().default(0),
  availableCount: z.number().int().optional(),
  minParticipants: z.number().int().optional(),
  assignedGuideId: z.string().uuid().optional(),
  priceOverride: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  bookingCutoffHours: z.number().int().optional(),
  meetingPoint: z.string().optional(),
  internalNotes: z.string().optional(),
  status: z.enum(['available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed']).optional().default('available'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateDepartureInput = z.infer<typeof CreateDepartureInputSchema>;
