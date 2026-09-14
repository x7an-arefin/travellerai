import { z } from 'zod';


export const CreateHotelBookingInputSchema = z.object({
  bookingReference: z.string().max(25),
  travelerId: z.string().uuid().optional(),
  propertyId: z.string().uuid(),
  checkInDate: z.string().max(10),
  checkOutDate: z.string().max(10),
  totalNights: z.number().int().default(1),
  totalRooms: z.number().int().default(1),
  totalAdults: z.number().int().default(2),
  totalChildren: z.number().int().optional().default(0),
  bookingStatus: z.enum(['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'refund_pending', 'refunded']).optional().default('pending_payment'),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/),
  roomChargesAmount: z.string().regex(/^\d+(\.\d+)?$/),
  incidentalChargesAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  taxAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  commissionAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  netProviderAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  paymentStatus: z.enum(['pending', 'authorized', 'partially_paid', 'paid', 'refunded']).optional().default('pending'),
  paymentMethod: z.string().max(50).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  specialRequests: z.string().optional(),
  estimatedArrivalTime: z.string().max(10).optional(),
  contactName: z.string().max(150),
  contactEmail: z.string().max(255),
  contactPhone: z.string().max(30).optional(),
  confirmationQrCode: z.string().max(500).optional(),
  checkedInAt: z.string().datetime().optional(),
  checkedOutAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelBookingInput = z.infer<typeof CreateHotelBookingInputSchema>;
