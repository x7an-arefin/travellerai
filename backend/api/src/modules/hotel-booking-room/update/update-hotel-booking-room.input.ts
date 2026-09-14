import { z } from 'zod';


export const UpdateHotelBookingRoomInputSchema = z.object({
  hotelBookingId: z.string().uuid().optional(),
  roomTypeId: z.string().uuid().optional(),
  roomUnitId: z.string().uuid().optional(),
  ratePlanId: z.string().uuid().optional(),
  guestName: z.string().max(150).optional(),
  guestEmail: z.string().max(255).optional(),
  nightlyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  roomNumberAssigned: z.string().max(20).optional(),
  assignedAt: z.string().datetime().optional(),
  assignedBy: z.string().uuid().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelBookingRoomInput = z.infer<typeof UpdateHotelBookingRoomInputSchema>;
