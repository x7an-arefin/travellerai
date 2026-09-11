import { z } from 'zod';


export const UpdateWaitlistInputSchema = z.object({
  departureId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  travelerEmail: z.string().max(255).optional(),
  travelerName: z.string().max(200).optional(),
  requestedSeats: z.number().int().optional(),
  status: z.enum(['waiting', 'offered', 'booked', 'expired', 'cancelled']).optional(),
  offerExpiresAt: z.string().datetime().optional(),
  notifiedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateWaitlistInput = z.infer<typeof UpdateWaitlistInputSchema>;
