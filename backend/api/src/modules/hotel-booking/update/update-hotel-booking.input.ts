import { z } from 'zod';


export const UpdateHotelBookingInputSchema = z.object({
  bookingReference: z.string().max(25).optional(),
  travelerId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  checkInDate: z.string().max(10).optional(),
  checkOutDate: z.string().max(10).optional(),
  totalNights: z.number().int().optional(),
  totalRooms: z.number().int().optional(),
  totalAdults: z.number().int().optional(),
  totalChildren: z.number().int().optional(),
  bookingStatus: z.enum(['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'refund_pending', 'refunded']).optional(),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  roomChargesAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  incidentalChargesAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  taxAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  commissionAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  netProviderAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  paymentStatus: z.enum(['pending', 'authorized', 'partially_paid', 'paid', 'refunded']).optional(),
  paymentMethod: z.string().max(50).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  specialRequests: z.string().optional(),
  estimatedArrivalTime: z.string().max(10).optional(),
  contactName: z.string().max(150).optional(),
  contactEmail: z.string().max(255).optional(),
  contactPhone: z.string().max(30).optional(),
  confirmationQrCode: z.string().max(500).optional(),
  checkedInAt: z.string().datetime().optional(),
  checkedOutAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelBookingInput = z.infer<typeof UpdateHotelBookingInputSchema>;
