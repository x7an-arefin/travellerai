import { z } from 'zod';


export const UpdateDepartureInputSchema = z.object({
  packageId: z.string().uuid().optional(),
  departureCode: z.string().max(50).optional(),
  startDatetime: z.string().datetime().optional(),
  endDatetime: z.string().datetime().optional(),
  capacity: z.number().int().optional(),
  bookedCount: z.number().int().optional(),
  availableCount: z.number().int().optional(),
  minParticipants: z.number().int().optional(),
  assignedGuideId: z.string().uuid().optional(),
  priceOverride: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  bookingCutoffHours: z.number().int().optional(),
  meetingPoint: z.string().optional(),
  internalNotes: z.string().optional(),
  status: z.enum(['available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateDepartureInput = z.infer<typeof UpdateDepartureInputSchema>;
