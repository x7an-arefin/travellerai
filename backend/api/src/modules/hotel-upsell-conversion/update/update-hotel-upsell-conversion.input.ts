import { z } from 'zod';


export const UpdateHotelUpsellConversionInputSchema = z.object({
  offerId: z.string().uuid().optional(),
  hotelBookingId: z.string().uuid().optional(),
  revenueAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  guestEmail: z.string().max(255).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelUpsellConversionInput = z.infer<typeof UpdateHotelUpsellConversionInputSchema>;
