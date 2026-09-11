import { z } from 'zod';


export const UpdateBookingInputSchema = z.object({
  bookingReference: z.string().max(20).optional(),
  travelerId: z.string().uuid().optional(),
  packageId: z.string().uuid().optional(),
  departureId: z.string().uuid().optional(),
  guestEmail: z.string().max(255).optional(),
  guestName: z.string().max(200).optional(),
  participantCount: z.number().int().optional(),
  bookingStatus: z.enum(['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']).optional(),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  baseAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  addonAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  discountAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  taxAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  serviceFeeAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  paidAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  balanceDue: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  displayCurrency: z.string().max(3).optional(),
  exchangeRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  couponCode: z.string().max(50).optional(),
  walletCreditUsed: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  contactName: z.string().max(200).optional(),
  contactEmail: z.string().max(255).optional(),
  contactPhone: z.string().max(30).optional(),
  pickupLocation: z.string().max(500).optional(),
  specialRequests: z.string().optional(),
  qrCode: z.string().max(500).optional(),
  voucherUrl: z.string().max(500).optional(),
  checkinStatus: z.enum(['pending', 'checked_in', 'no_show']).optional(),
  checkinTime: z.string().datetime().optional(),
  inventoryLockedUntil: z.string().datetime().optional(),
  confirmedAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateBookingInput = z.infer<typeof UpdateBookingInputSchema>;
