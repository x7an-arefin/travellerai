import { z } from 'zod';


export const UpdateHotelGuestFolioInputSchema = z.object({
  hotelBookingId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  roomNumber: z.string().max(20).optional(),
  chargeType: z.enum(['minibar', 'room_service', 'laundry', 'late_checkout', 'early_checkin', 'spa', 'damage', 'parking', 'other']).optional(),
  description: z.string().max(255).optional(),
  amount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  postedBy: z.string().uuid().optional(),
  invoiceNumber: z.string().max(50).optional(),
  receiptUrl: z.string().max(500).optional(),
  isPaid: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelGuestFolioInput = z.infer<typeof UpdateHotelGuestFolioInputSchema>;
