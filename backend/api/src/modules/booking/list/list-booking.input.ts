import { z } from 'zod';


export const ListBookingInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  travelerId: z.string().optional(),
  packageId: z.string().optional(),
  departureId: z.string().optional(),
  bookingStatus: z.string().optional(),
  checkinStatus: z.string().optional(),

});


export type ListBookingInput = z.infer<typeof ListBookingInputSchema>;
