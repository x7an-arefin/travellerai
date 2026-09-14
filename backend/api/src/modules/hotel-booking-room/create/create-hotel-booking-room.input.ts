import { z } from 'zod';


export const CreateHotelBookingRoomInputSchema = z.object({
  hotelBookingId: z.string().uuid(),
  roomTypeId: z.string().uuid(),
  roomUnitId: z.string().uuid().optional(),
  ratePlanId: z.string().uuid().optional(),
  guestName: z.string().max(150),
  guestEmail: z.string().max(255).optional(),
  nightlyRate: z.string().regex(/^\d+(\.\d+)?$/),
  roomNumberAssigned: z.string().max(20).optional(),
  assignedAt: z.string().datetime().optional(),
  assignedBy: z.string().uuid().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelBookingRoomInput = z.infer<typeof CreateHotelBookingRoomInputSchema>;
