import { z } from 'zod';


export const CreateHotelGuestFolioInputSchema = z.object({
  hotelBookingId: z.string().uuid(),
  propertyId: z.string().uuid(),
  roomNumber: z.string().max(20).optional(),
  chargeType: z.enum(['minibar', 'room_service', 'laundry', 'late_checkout', 'early_checkin', 'spa', 'damage', 'parking', 'other']).optional().default('room_service'),
  description: z.string().max(255),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3).optional().default('USD'),
  postedBy: z.string().uuid().optional(),
  invoiceNumber: z.string().max(50).optional(),
  receiptUrl: z.string().max(500).optional(),
  isPaid: z.boolean().optional().default(false),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelGuestFolioInput = z.infer<typeof CreateHotelGuestFolioInputSchema>;
